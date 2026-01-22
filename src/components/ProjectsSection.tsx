
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { RevealText } from "./RevealText";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";
import { Plus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Project {
  id: string;
  title: string;
  category: string;
  image_url: string;
  type: "video" | "photo";
}

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();
  const session = auth?.session;
  const { toast } = useToast();

  // Admin States
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState({
    title: "",
    category: "",
    type: "video" as "video" | "photo",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProjects(data as Project[]);
    } else if (error) {
      console.error("Error fetching projects:", error);
      toast({
        title: "Erro ao carregar projetos",
        description: error.message,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSaveProject = async () => {
    if (!newProject.title || !newProject.category || (!selectedFile && !editingProject)) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos e selecione uma imagem.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let publicUrl = editingProject?.image_url || "";

      // Upload Image if selected
      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('portfolio')
          .upload(filePath, selectedFile);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from('portfolio')
          .getPublicUrl(filePath);
        
        publicUrl = data.publicUrl;
      }

      if (editingProject) {
        // Update existing
        const { error } = await supabase
          .from('projects')
          .update({
            title: newProject.title,
            category: newProject.category,
            type: newProject.type,
            image_url: publicUrl,
          })
          .eq('id', editingProject.id);

        if (error) throw error;
        toast({ title: "Projeto atualizado!" });
      } else {
        // Create new
        const { error } = await supabase
          .from('projects')
          .insert({
            title: newProject.title,
            category: newProject.category,
            type: newProject.type,
            image_url: publicUrl,
          });

        if (error) throw error;
        toast({ title: "Projeto criado!" });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchProjects();
    } catch (error: any) {
      toast({
        title: "Erro ao salvar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = async (id: string, imageUrl: string) => {
    if (!confirm("Tem certeza que deseja excluir este projeto?")) return;

    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;

      toast({ title: "Projeto excluído" });
      fetchProjects();
    } catch (error: any) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    }
  };

  const openNewProjectDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (project: Project) => {
    setEditingProject(project);
    setNewProject({
      title: project.title,
      category: project.category,
      type: project.type,
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingProject(null);
    setNewProject({ title: "", category: "", type: "video" });
    setSelectedFile(null);
  };

  return (
    <section id="projects" className="py-24 bg-background relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative"
        >
          <span className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
            Portfólio
          </span>
          <h2 className="section-title">
            <RevealText text="PROJETOS EM" className="mr-3" />
            <RevealText text="DESTAQUE" className="text-white" delay={0.2} />
          </h2>
          
          {session && (
            <div className="absolute top-0 right-0">
              <Button onClick={openNewProjectDialog} className="gap-2">
                <Plus size={18} /> Novo Projeto
              </Button>
            </div>
          )}
        </motion.div>

        {loading ? (
          <div className="text-center text-muted-foreground">Carregando projetos...</div>
        ) : projects.length === 0 ? (
          <div className="text-center text-muted-foreground">Em breve...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                id={project.id}
                title={project.title}
                category={project.category}
                image={project.image_url}
                type={project.type}
                index={index} 
                onDelete={handleDeleteProject}
                onEdit={openEditDialog}
              />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="https://instagram.com/ricardoradtke_"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cinematic inline-flex items-center gap-3"
          >
            Ver Todos os Projetos
          </a>
        </motion.div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-card border-border">
          <DialogHeader>
            <DialogTitle>{editingProject ? "Editar Projeto" : "Novo Projeto"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Título</Label>
              <Input 
                value={newProject.title}
                onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                placeholder="Ex: Golden Hour" 
              />
            </div>
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Input 
                value={newProject.category}
                onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                placeholder="Ex: Casamento" 
              />
            </div>
            <div className="space-y-2">
              <Label>Tipo</Label>
              <Select 
                value={newProject.type} 
                onValueChange={(val: "video" | "photo") => setNewProject({...newProject, type: val})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Vídeo</SelectItem>
                  <SelectItem value="photo">Foto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Imagem de Capa {editingProject && "(Deixe vazio para manter a atual)"}</Label>
              <Input type="file" onChange={handleFileSelect} accept="image/*" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSaveProject} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsSection;

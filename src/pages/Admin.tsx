
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Plus, Image as ImageIcon, LayoutDashboard, Trash2, Edit2, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

const Admin = () => {
  const { session, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  
  // Form States
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    category: "",
    type: "video" as "video" | "photo",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (!loading && !session) {
      navigate("/login");
    } else if (session) {
      fetchProjects();
    }
  }, [session, loading, navigate]);

  const fetchProjects = async () => {
    setIsLoadingData(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Erro ao carregar projetos",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setProjects(data as Project[]);
    }
    setIsLoadingData(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleCreateProject = async () => {
    if (!newProject.title || !newProject.category || !selectedFile) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos e selecione uma imagem.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Upload Image
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio')
        .getPublicUrl(filePath);

      // 2. Insert Project
      const { error: insertError } = await supabase
        .from('projects')
        .insert({
          title: newProject.title,
          category: newProject.category,
          type: newProject.type,
          image_url: publicUrl,
        });

      if (insertError) throw insertError;

      toast({
        title: "Sucesso!",
        description: "Projeto adicionado com sucesso.",
      });

      setIsDialogOpen(false);
      setNewProject({ title: "", category: "", type: "video" });
      setSelectedFile(null);
      fetchProjects();

    } catch (error: any) {
      toast({
        title: "Erro ao criar projeto",
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
      // Delete from DB
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;

      // Extract filename from URL to delete from storage (optional/advanced)
      // For simplicity, we just delete the record for now

      toast({ title: "Projeto excluído" });
      fetchProjects();
    } catch (error: any) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-background text-foreground">Carregando...</div>;
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="text-primary h-8 w-8" />
            <h1 className="font-display text-3xl tracking-wider text-foreground">PAINEL ADMIN</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground text-sm hidden md:inline-block">
              {session.user.email}
            </span>
            <Button variant="outline" onClick={handleSignOut} className="gap-2 border-border hover:bg-secondary/50">
              <LogOut size={16} />
              Sair
            </Button>
          </div>
        </header>

        <Tabs defaultValue="projects" className="w-full space-y-8">
          <TabsList className="bg-card border border-border p-1 w-full max-w-md mx-auto grid grid-cols-2 h-auto">
            <TabsTrigger value="projects" className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Projetos</TabsTrigger>
            <TabsTrigger value="photos" className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Galeria de Fotos</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="mt-6">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 pb-6">
                <div>
                  <CardTitle className="text-xl">Gerenciar Projetos</CardTitle>
                  <CardDescription className="text-muted-foreground mt-1">Adicione ou edite os projetos do portfólio.</CardDescription>
                </div>
                
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                      <Plus size={16} /> Novo Projeto
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-border">
                    <DialogHeader>
                      <DialogTitle>Novo Projeto</DialogTitle>
                      <DialogDescription>Adicione um novo projeto ao seu portfólio.</DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
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
                        <Label>Imagem de Capa</Label>
                        <Input type="file" onChange={handleFileSelect} accept="image/*" />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                      <Button onClick={handleCreateProject} disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Salvar
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

              </CardHeader>
              <CardContent className="pt-8">
                {isLoadingData ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : projects.length === 0 ? (
                  <div className="text-center py-16 text-muted-foreground border-2 border-dashed border-border rounded-lg bg-background/50">
                    <p className="text-lg mb-2">Nenhum projeto encontrado</p>
                    <p className="text-sm opacity-70">Clique em "Novo Projeto" para começar.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                      <div key={project.id} className="group relative aspect-video bg-muted rounded-lg overflow-hidden border border-border">
                        <img 
                          src={project.image_url} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button size="icon" variant="destructive" onClick={() => handleDeleteProject(project.id, project.image_url)}>
                            <Trash2 size={18} />
                          </Button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                          <p className="text-white font-medium">{project.title}</p>
                          <p className="text-white/70 text-xs">{project.category}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="photos" className="mt-6">
             <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 pb-6">
                <div>
                  <CardTitle className="text-xl">Gerenciar Fotos</CardTitle>
                  <CardDescription className="text-muted-foreground mt-1">Upload de imagens para a galeria.</CardDescription>
                </div>
                <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                  <ImageIcon size={16} /> Upload Foto
                </Button>
              </CardHeader>
              <CardContent className="pt-8">
                <div className="text-center py-16 text-muted-foreground border-2 border-dashed border-border rounded-lg bg-background/50">
                  <p className="text-lg mb-2">Galeria Vazia</p>
                  <p className="text-sm opacity-70">Funcionalidade de upload aguardando configuração do Storage.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;

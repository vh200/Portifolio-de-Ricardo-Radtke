-- Rode este código no "SQL Editor" do Supabase para criar as tabelas necessárias

-- Tabela de Projetos
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  category text not null,
  image_url text not null,
  type text not null check (type in ('video', 'photo')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar segurança (RLS)
alter table public.projects enable row level security;

-- Política: Qualquer um pode ver os projetos (público)
create policy "Projetos são públicos"
  on public.projects for select
  to anon
  using (true);

-- Política: Apenas usuários logados podem inserir/editar/deletar
create policy "Apenas admin pode modificar projetos"
  on public.projects for all
  to authenticated
  using (true);

-- Storage (Bucket para imagens)
-- Você precisará criar um bucket chamado 'portfolio' no menu "Storage" do Supabase
-- E configurar a política para ser público para leitura e restrito para escrita.

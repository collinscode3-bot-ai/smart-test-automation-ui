export interface Project {
  id: number;
  title: string;
  description: string;
  iconType: 'folder' | 'globe' | 'rocket';
  status: string;
}

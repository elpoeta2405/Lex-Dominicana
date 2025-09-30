
export type AppView = 'chat' | 'database' | 'documents';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

export interface DocumentTemplate {
  id: string;
  title: string;
  description: string;
  fields: DocumentField[];
}

export interface DocumentField {
  id: string;
  label: string;
  type: 'text' | 'date' | 'number';
}

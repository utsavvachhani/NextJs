interface MockUser {
  id: string
  email: string
  name: string
  password?: string
}

export const mockUsers: MockUser[] = [
  { id: '1', email: 'admin@example.com', name: 'Admin User', password: '12345678' }
];

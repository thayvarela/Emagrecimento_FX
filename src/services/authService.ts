import { User } from '../types.ts';

const USERS_KEY = 'fitness_app_users';
const SESSION_KEY = 'fitness_app_session';

// Helper to get users from localStorage
const getUsers = (): Record<string, { id: string, email: string, passwordHash: string }> => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : {};
};

// Helper to save users to localStorage
const saveUsers = (users: object) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const register = (email: string, password: string): User => {
  if (!email || !password) {
    throw new Error('Email e senha são obrigatórios.');
  }
  const users = getUsers();
  if (users[email]) {
    throw new Error('Este email já está cadastrado.');
  }

  const newUser: User = {
    id: `user_${Date.now()}`,
    email,
  };

  // In a real app, NEVER store plain text passwords. Hash them on the backend.
  // This is a simple simulation.
  users[email] = { ...newUser, passwordHash: password }; 
  saveUsers(users);
  
  // Automatically log in after registration
  localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));

  return newUser;
};

export const login = (email: string, password: string): User => {
  const users = getUsers();
  const userRecord = users[email];

  if (!userRecord || userRecord.passwordHash !== password) {
    throw new Error('Email ou senha inválidos.');
  }

  const user: User = { id: userRecord.id, email: userRecord.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));

  return user;
};

export const logout = () => {
  localStorage.removeItem(SESSION_KEY);
};

export const getCurrentUser = (): User | null => {
  const session = localStorage.getItem(SESSION_KEY);
  return session ? JSON.parse(session) : null;
};

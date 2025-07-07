export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'membre';
  createdAt: string;
}

export interface Space {
  id: string;
  name: string;
  type: 'bureau_prive' | 'open_space' | 'salle_reunion' | 'espace_detente';
  capacity: number;
  hourlyRate: number;
  description?: string;
  amenities: string[];
  isActive: boolean;
}

export interface Reservation {
  id: string;
  user: User;
  space: Space;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  //totalPrice: number;
  createdAt: string;
}

export interface AuthPayload {
  token: string;
  user: User;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface CreateSpaceInput {
  name: string;
  type: 'bureau_prive' | 'open_space' | 'salle_reunion' | 'espace_detente';
  capacity: number;
  hourlyRate: number;
  description?: string;
  amenities: string[];
  
}

export interface UpdateSpaceInput {
  id: string;
  name?: string;
  type?: 'bureau_prive' | 'open_space' | 'salle_reunion' | 'espace_detente';
  capacity?: number;
  hourlyRate?: number;
  description?: string;
  amenities?: string[];
}

export interface CreateReservationInput {
  spaceId: string;
  startTime: string;
  endTime: string;
}

export interface SpaceAvailabilityInput {
  spaceId: string;
  startTime: string;
  endTime: string;
}

export interface UpdateReservationStatusInput {
  id: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}
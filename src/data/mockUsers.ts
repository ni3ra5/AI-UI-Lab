export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'Admin' | 'Editor' | 'Viewer' | 'Manager';
  status: 'Active' | 'Inactive' | 'Pending';
  joinDate: string;
}

const firstNames = [
  'Emma', 'Liam', 'Sophia', 'Noah', 'Olivia', 'James', 'Ava', 'Lucas',
  'Isabella', 'Mason', 'Mia', 'Ethan', 'Charlotte', 'Logan', 'Amelia',
  'Alexander', 'Harper', 'Benjamin', 'Evelyn', 'Daniel', 'Aria', 'Henry',
  'Chloe', 'Sebastian', 'Scarlett', 'Jack', 'Grace', 'Owen', 'Lily', 'Samuel',
  'Zoe', 'Ryan', 'Nora', 'Nathan', 'Riley', 'Caleb', 'Hannah', 'Leo',
  'Addison', 'Isaac', 'Eleanor', 'Gabriel', 'Stella', 'Julian', 'Maya',
  'Wyatt', 'Aurora', 'Jayden', 'Penelope', 'Luke',
];

const lastNames = [
  'Anderson', 'Chen', 'Williams', 'Patel', 'Johnson', 'Kim', 'Davis',
  'Martinez', 'Brown', 'Taylor', 'Wilson', 'Lee', 'Garcia', 'Rodriguez',
  'Clark', 'Lewis', 'Walker', 'Hall', 'Young', 'Allen', 'Wright', 'King',
  'Scott', 'Green', 'Baker', 'Adams', 'Nelson', 'Hill', 'Campbell', 'Mitchell',
  'Roberts', 'Carter', 'Phillips', 'Evans', 'Turner', 'Torres', 'Parker',
  'Collins', 'Edwards', 'Stewart', 'Flores', 'Morris', 'Nguyen', 'Murphy',
  'Rivera', 'Cook', 'Rogers', 'Morgan', 'Peterson', 'Cooper',
];

const roles: User['role'][] = ['Admin', 'Editor', 'Viewer', 'Manager'];
const statuses: User['status'][] = ['Active', 'Active', 'Active', 'Inactive', 'Pending'];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateUsers(count: number): User[] {
  const rand = seededRandom(42);
  const users: User[] = [];

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(rand() * firstNames.length)];
    const lastName = lastNames[Math.floor(rand() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;

    const year = 2023 + Math.floor(rand() * 3);
    const month = 1 + Math.floor(rand() * 12);
    const day = 1 + Math.floor(rand() * 28);
    const joinDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    users.push({
      id: `user-${String(i + 1).padStart(3, '0')}`,
      name,
      email,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=4F46E5&textColor=ffffff`,
      role: roles[Math.floor(rand() * roles.length)],
      status: statuses[Math.floor(rand() * statuses.length)],
      joinDate,
    });
  }

  return users;
}

export const mockUsers: User[] = generateUsers(54);

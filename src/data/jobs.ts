// Mock data for job listings

export interface Job {
  id: string;
  title: string;
  location: string;
  building: string;
  payRate: string;
  duration: string;
  description: string;
  postedBy: string;
  postedDate: string;
  category: 'delivery' | 'cleaning' | 'tutoring' | 'moving' | 'other';
  status?: 'available' | 'in-progress' | 'completed';
}

export const jobsData: Job[] = [
  {
    id: '1',
    title: 'Deliver food from dining hall',
    location: 'West Campus',
    building: 'Morrison Hall',
    payRate: '$8',
    duration: '30 min',
    description: 'Pick up dinner from the dining hall and deliver to Morrison Hall room 312. Will tip extra for quick delivery!',
    postedBy: 'Sarah J.',
    postedDate: '2 hours ago',
    category: 'delivery',
    status: 'available',
  },
  {
    id: '2',
    title: 'Help move furniture',
    location: 'East Campus',
    building: 'Fletcher Hall',
    payRate: '$15',
    duration: '1 hour',
    description: 'Need help moving a couch and desk from storage to my dorm room. Must be able to lift heavy items.',
    postedBy: 'Mike T.',
    postedDate: '5 hours ago',
    category: 'moving',
    status: 'available',
  },
  {
    id: '3',
    title: 'Calculus tutoring needed',
    location: 'Library',
    building: 'Main Library 2nd Floor',
    payRate: '$20/hr',
    duration: '2 hours',
    description: 'Looking for help with Calculus II. Need to prepare for midterm exam next week.',
    postedBy: 'Emma L.',
    postedDate: '1 day ago',
    category: 'tutoring',
    status: 'available',
  },
  {
    id: '4',
    title: 'Room cleaning service',
    location: 'South Campus',
    building: 'Kennedy Hall',
    payRate: '$12',
    duration: '45 min',
    description: 'Deep clean my dorm room before parents visit this weekend. Vacuum, dust, organize.',
    postedBy: 'Alex K.',
    postedDate: '3 hours ago',
    category: 'cleaning',
    status: 'available',
  },
  {
    id: '5',
    title: 'Coffee run for study group',
    location: 'Campus Center',
    building: 'Student Union',
    payRate: '$10',
    duration: '20 min',
    description: 'Get 4 coffees from campus Starbucks and bring to study room in library. Orders will be ready.',
    postedBy: 'Jordan P.',
    postedDate: '30 min ago',
    category: 'delivery',
    status: 'available',
  },
  {
    id: '6',
    title: 'Grocery delivery',
    location: 'North Campus',
    building: 'Wilson Hall',
    payRate: '$12',
    duration: '1 hour',
    description: 'Pick up groceries from Target (I will order online) and deliver to my dorm.',
    postedBy: 'Chris M.',
    postedDate: '4 hours ago',
    category: 'delivery',
    status: 'available',
  },
];

// Jobs that the current user has claimed/is working on
export const myJobsData: Job[] = [
  {
    id: '7',
    title: 'Late night snack delivery',
    location: 'West Campus',
    building: 'Clark Hall',
    payRate: '$6',
    duration: '15 min',
    description: 'Deliver chips and drinks from vending machine to room 204.',
    postedBy: 'Taylor B.',
    postedDate: '10 min ago',
    category: 'delivery',
    status: 'in-progress',
  },
  {
    id: '8',
    title: 'Chemistry tutoring',
    location: 'Science Building',
    building: 'Chemistry Lab 101',
    payRate: '$18/hr',
    duration: '1.5 hours',
    description: 'Help with organic chemistry lab report and practice problems.',
    postedBy: 'Sam R.',
    postedDate: 'Yesterday',
    category: 'tutoring',
    status: 'completed',
  },
];

export const teamMembers = {
  CA: {
    name: "Carlos Alvarez",
    title: "Frontend Developer",
    email: "carlos@example.com",
    initials: "CA",
  },
  JS: {
    name: "Jane Smith",
    title: "Backend Developer",
    email: "jane@example.com",
    initials: "JS",
  },
  AJ: {
    name: "Alex Johnson",
    title: "Full Stack Developer",
    email: "alex@example.com",
    initials: "AJ",
  },
  EW: {
    name: "Emma Wilson",
    title: "UI/UX Designer",
    email: "emma@example.com",
    initials: "EW",
  },
  JD: {
    name: "John Doe",
    title: "Project Manager",
    email: "john@example.com",
    initials: "JD",
  },
};

export const summary = {
  totalTasks: 12,
  last10Tasks: [
    {
      _id: 1,
      title: "Test task",
      priority: "high",
      stage: "todo",
      review: "Duplicate",
      date: "2026-01-15",
      team: ["CA", "JS", "AJ"],
      activities: [], // теперь массив
      assets: [],     // теперь массив
      subTasks: [
        {
          title: "Write unit tests",
          date: "2026-01-20",
          tag: "Testing",
        },
      ],
    },
    {
      _id: 2,
      title: "Duplicate - Duplicate - Review Code Changes",
      priority: "medium",
      stage: "in progress",
      review: "Duplicate",
      date: "2026-01-10",
      team: ["AJ", "EW"],
      activities: [
        { text: "Please review this PR", user: "AJ", date: "2026-01-11" }
      ],
      assets: [
        { name: "code_review.pdf", url: "#" }
      ],
      subTasks: [
        {
          title: "Review pull request",
          date: "2026-01-12",
          tag: "Review",
        },
      ],
    },
    {
      _id: 3,
      title: "Website Project Proposal Review",
      priority: "medium",
      stage: "todo",
      review: "Duplicate",
      date: "2026-01-05",
      team: ["AJ", "EW"],
      activities: [],
      assets: [],
      subTasks: [
        {
          title: "Review proposal document",
          date: "2026-01-08",
          tag: "Documentation",
        },
      ],
    },
    {
      _id: 4,
      title: "Task Manager Youtube Video",
      priority: "low",
      stage: "completed",
      review: "Duplicate",
      date: "2026-01-18",
      team: ["AJ", "EW"],
      activities: [
        { text: "Great video!", user: "EW", date: "2026-01-19" },
        { text: "Needs more examples", user: "AJ", date: "2026-01-20" }
      ],
      assets: [
        { name: "thumbnail.png", url: "#" },
        { name: "script.docx", url: "#" }
      ],
      subTasks: [
        {
          title: "Blog App Admin Dashboard",
          date: "2026-02-08",
          tag: "Website App",
        },
      ],
    },
    {
      _id: 5,
      title: "Bug Fixing",
      priority: "high",
      stage: "in progress",
      review: "Duplicate",
      date: "2026-01-20",
      team: ["CA", "JD", "JS"],
      activities: [
        { text: "Found the issue", user: "CA", date: "2026-01-21" }
      ],
      assets: [
        { name: "error_log.txt", url: "#" },
        { name: "fix.patch", url: "#" }
      ],
      subTasks: [
        {
          title: "Check Login code and fix bugs asap",
          date: "2026-02-08",
          tag: "Bug Fixing",
        },
      ],
    },
    {
      _id: 6,
      title: "Duplicate - Website Project Proposal Changes",
      priority: "medium",
      stage: "todo",
      review: "Duplicate",
      date: "2026-01-14",
      team: ["AJ", "EW"],
      activities: [],
      assets: [],
      subTasks: [
        {
          title: "Update proposal changes",
          date: "2026-01-16",
          tag: "Update",
        },
      ],
    },
    {
      _id: 7,
      title: "Duplicate - Website Project Proposal Normal",
      priority: "medium",
      stage: "completed",
      review: "Duplicate",
      date: "2026-01-03",
      team: ["CA", "JD", "JS"],
      activities: [
        { text: "Approved", user: "JD", date: "2026-01-04" }
      ],
      assets: [],
      subTasks: [
        {
          title: "Normal proposal review",
          date: "2026-01-05",
          tag: "Review",
        },
      ],
    },
    {
      _id: 8,
      title: "Review Code Changes",
      priority: "medium",
      stage: "in progress",
      review: "Duplicate",
      date: "2026-01-22",
      team: ["AJ", "EW"],
      activities: [],
      assets: [
        { name: "diff.txt", url: "#" }
      ],
      subTasks: [
        {
          title: "Approve code changes",
          date: "2026-01-25",
          tag: "Approval",
        },
      ],
    },
    {
      _id: 9,
      title: "Website Project Proposal",
      priority: "high",
      stage: "todo",
      review: "Duplicate",
      date: "2026-01-17",
      team: ["CA", "JD", "JS"],
      activities: [],
      assets: [],
      subTasks: [
        {
          title: "Draft proposal",
          date: "2026-01-19",
          tag: "Draft",
        },
      ],
    },
    {
      _id: 10,
      title: "Design System Implementation",
      priority: "low",
      stage: "in progress",
      review: "Duplicate",
      date: "2026-01-25",
      team: ["EW", "AJ"],
      activities: [
        { text: "Let's use Tailwind", user: "EW", date: "2026-01-26" }
      ],
      assets: [
        { name: "design_tokens.json", url: "#" },
        { name: "components.png", url: "#" }
      ],
      subTasks: [
        {
          title: "Create design tokens",
          date: "2026-01-28",
          tag: "Design",
        },
      ],
    },
  ],
  users: [
    {
      _id: 1,
      name: "Алексей Иванов",
      email: "alex@example.com",
      role: "admin",
      joinDate: "2026-01-01",
      createdAt: "2026-01-01T10:30:00Z",
      isActive: true,
      title: "Team Lead",
    },
    {
      _id: 2,
      name: "Мария Петрова",
      email: "maria@example.com",
      role: "user",
      joinDate: "2026-01-05",
      createdAt: "2026-01-05T09:15:00Z",
      isActive: true,
      title: "Frontend Developer",
    },
    {
      _id: 3,
      name: "Дмитрий Сидоров",
      email: "dmitry@example.com",
      role: "user",
      joinDate: "2026-01-10",
      createdAt: "2026-01-10T14:20:00Z",
      isActive: false,
      title: "Backend Developer",
    },
    {
      _id: 4,
      name: "Елена Васильева",
      email: "elena@example.com",
      role: "user",
      joinDate: "2026-01-12",
      createdAt: "2026-01-12T11:45:00Z",
      isActive: true,
      title: "UI/UX Designer",
    },
  ],
  tasks: {
    todo: 5,
    "in progress": 4,
    completed: 2,
  },
  graphData: [
    { name: "High", total: 3 },
    { name: "Medium", total: 5 },
    { name: "Low", total: 2 },
  ],
};

export const chartData = [
  { name: "High", total: 14 },
  { name: "Medium", total: 10 },
  { name: "Low", total: 13 },
];

export default summary;
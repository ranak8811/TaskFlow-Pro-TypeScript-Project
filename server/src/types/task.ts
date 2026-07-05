// টাস্কের স্ট্যাটাসের জন্য একটি স্ট্রিং এনাম (String Enum) তৈরি করলাম
export enum TaskStatus {
  Todo = "TODO",
  InProgress = "IN_PROGRESS",
  Done = "DONE",
}

// টাস্কের গঠনের জন্য ইন্টারফেস
export interface Task {
  readonly id: string;
  title: string;
  status: TaskStatus;
  tags: string[]; // স্ট্রিং এর একটি অ্যারে (Array)
  assignee: [string, string]; // টাপল (Tuple): [ইউজার আইডি, ইউজারের নাম]
}

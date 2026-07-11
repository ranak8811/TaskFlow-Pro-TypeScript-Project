// টাস্ক ডাটা ইন্টারফেস
interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
}

// ১. Mapped Type - একটি অবজেক্টের সব ফিল্ডকে ডায়নামিকালি রিড-অনলি করলাম
type ReadOnlyMapped<T> = {
  readonly [P in keyof T]: T[P];
};

// ২. Conditional Type - টাইপ ফিল্টারিং কন্ডিশন
type IsString<T> = T extends string ? "yes" : "no";

// ৩. Mapped Type + Conditional Type - অবজেক্টের কেবল স্ট্রিং ফিল্ডগুলো বেছে নেওয়ার টাইপ
type OnlyStrings<T> = {
  [P in keyof T]: T[P] extends string ? T[P] : never;
};

// --- ব্যবহারের পরীক্ষা ---
type ReadOnlyTask = ReadOnlyMapped<Task>;
type TestString = IsString<string>; // টাইপ হবে "yes"
type TestNumber = IsString<number>; // টাইপ হবে "no"

const taskData: ReadOnlyTask = {
  id: "task-101",
  title: "Learn Mapped Types",
  isCompleted: false,
};

// taskData.title = "New Title"; // এরর দিবে! কারণ এটি এখন Readonly প্রপার্টি

console.log(`Task Title (ReadOnly): ${taskData.title}`);
console.log(`Is string type a string?: yes`);

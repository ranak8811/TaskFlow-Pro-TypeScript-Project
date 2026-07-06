// কাস্টম অ্যাপ এরর ক্লাস যা বিল্ট-ইন Error ক্লাসকে বর্ধিত করে
export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message); // মাদার ক্লাসের Message সেট করা হলো
    this.statusCode = statusCode;

    // প্রোটোটাইপ চেইন ফিক্স করা (ইনহেরিটেড ক্লাসের instanceof চেক ঠিক রাখার জন্য)
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

function greetUser(username: string): string {
  // username অবশ্যই string হতে হবে এবং ফাংশনটি string রিটার্ন করবে
  return `Welcome to TaskFlow Pro, ${username}!`;
}

const user = "Anwar";
console.log(greetUser(user));

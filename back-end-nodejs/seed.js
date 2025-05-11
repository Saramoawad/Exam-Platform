const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const User = require("./models/user");
const Exam = require("./models/exam");
const Question = require("./models/question");
const Result = require("./models/result");

mongoose.connect("mongodb://localhost:27017/exam-platform", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

async function seedDatabase() {
  try {
    await User.deleteMany({});
    await Exam.deleteMany({});
    await Question.deleteMany({});
    await Result.deleteMany({});
    console.log("Cleared existing data");

    function generateValidUsername() {
      const letters = faker.string.alpha({ length: 1 });
      const rest = faker.string.alphanumeric({ length: 7 });
      return letters + rest;
    }

    function generateValidEmail() {
      const name = faker.string.alpha({ length: 4 });
      const domain = faker.string.alpha({ length: 5 });
      const tld = faker.helpers.arrayElement(["com", "net", "edu"]);
      return `${name}@${domain}.${tld}`;
    }

    const users = [];
    for (let i = 0; i < 5; i++) {
      const role = i === 0 ? "teacher" : "student";
      const firstName = faker.person.firstName().replace(/[^a-zA-Z]/g, "");
      const lastName = faker.person.lastName().replace(/[^a-zA-Z]/g, "");
      const user = new User({
        firstName,
        lastName,
        username: generateValidUsername(),
        email: generateValidEmail(),
        password: "a12345678",
        role,
        stageLevel: role === "student" ? "High School" : undefined,
      });

      await user.save();
      users.push(user);
      console.log(`Created user: ${firstName} ${lastName} (${role})`);
    }

    const teacher = users.find((u) => u.role === "teacher");
    const students = users.filter((u) => u.role === "student");

    const exams = [];
    for (let i = 0; i < 10; i++) {
      const exam = new Exam({
        name: faker.lorem.words(2),
        description: faker.lorem.sentence(),
        subject: faker.helpers.arrayElement(["Math", "Science", "History"]),
        level: faker.helpers.arrayElement(["easy", "medium", "hard"]),
        stageLevel: "High School",
        user: teacher._id,
      });
      await exam.save();
      exams.push(exam);
      console.log(`Created exam: ${exam.name}`);
    }

    const questions = [];
    for (const exam of exams) {
      for (let i = 0; i < 10; i++) {
        const q = new Question({
          question: faker.lorem.sentence(),
          choices: {
            a: faker.word.noun(),
            b: faker.word.noun(),
            c: faker.word.noun(),
            d: faker.word.noun(),
          },
          correctAnswer: faker.helpers.arrayElement(["a", "b", "c", "d"]),
          difficulty: faker.helpers.arrayElement([1, 2, 3]),
          exam: exam._id,
          user: teacher._id,
        });
        await q.save();
        questions.push(q);
        exam.questions.push(q._id);
      }
      await exam.save();
      console.log(`Updated exam ${exam.name} with ${exam.questions.length} questions`);
    }

    for (const student of students) {
      for (const exam of exams) {
        const answers = exam.questions.map((qId) => {
          const question = questions.find((q) => q._id.equals(qId));
          const correct = question.correctAnswer;
          const selected = faker.helpers.arrayElement(["a", "b", "c", "d"]);
          const isCorrect = selected === correct;
          const marks = isCorrect ? 10 : 0;
          return {
            questionId: qId,
            selectedAnswer: selected,
            correctAnswer: correct,
            marks,
          };
        });

        const score = answers.reduce((sum, answer) => sum + answer.marks, 0);
        const passed = score >= exam.passingMarks;

        const result = new Result({
          studentId: student._id,
          examId: exam._id,
          score,
          passed,
          answers,
        });
        await result.save();
        console.log(`Created result for student ${student.username} in exam ${exam.name}`);
      }
    }

    console.log("Database seeded with fake data");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB connection closed");
  }
}

seedDatabase();
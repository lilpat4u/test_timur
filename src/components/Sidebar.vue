<template>
  <transition name="slide">
    <div v-if="visible" class="fixed right-0 top-0 w-96 h-full bg-white shadow-lg z-50 p-4 overflow-auto">
      <h2 class="text-2xl font-bold">Добавить вопросы</h2>

      <div v-for="(question, questionIndex) in questions" :key="questionIndex" class="mt-6">
        <!-- Вопрос -->
        <label class="block">
          Введите текст вопроса:
          <input
            v-model="question.text"
            type="text"
            class="w-full mt-2 input border-2 border-gray-300 rounded-md focus:border-gray-500 focus:outline-none"
          />
        </label>

        <!-- Чекбокс "Обязательный вопрос" -->
        <label class="flex items-center mt-4">
          <input v-model="question.required" type="checkbox" class="mr-2" />
          Обязательный вопрос
        </label>

        <!-- Варианты ответа -->
        <div class="mt-4">
          <label>Введите варианты ответа:</label>
          <div v-for="(answer, answerIndex) in question.answers" :key="answerIndex" class="mt-2 flex items-center">
            <!-- Радиокнопка для правильного ответа -->
            <input
              type="radio"
              :name="'correct-answer-' + questionIndex"
              v-model="question.correctAnswer"
              :value="answerIndex"
              class="mr-2"
            />
            <input
              v-model="question.answers[answerIndex]"
              type="text"
              class="w-full input border-2 border-gray-300 rounded-md focus:border-gray-500 focus:outline-none"
              placeholder="Вариант ответа"
            />
          </div>
          <button @click="addAnswer(questionIndex)" class="mt-2 btn-secondary">Добавить ещё вариант</button>
          <hr class="solid mt-8" />
        </div>
      </div>

      <!-- Кнопки управления -->
      <div class="flex justify-between mt-6">
        <button @click="addNewQuestion" class="btn-secondary">Добавить ещё вопрос</button>
        <button @click="saveQuestions" class="btn-primary">Сохранить все вопросы</button>
        <button @click="closeSidebar" class="btn-secondary">Закрыть</button>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      questions: [
        {
          text: "",
          required: false,
          answers: [""], // Варианты ответа для первого вопроса
          correctAnswer: 0, // Индекс правильного ответа
        },
      ],
    };
  },
  methods: {
    closeSidebar() {
      this.$emit("close");
    },
    addAnswer(questionIndex: number) {
      // Добавление нового варианта ответа для конкретного вопроса
      this.questions[questionIndex].answers.push("");
    },
    addNewQuestion() {
      // Добавление нового вопроса
      this.questions.push({
        text: "",
        required: false,
        answers: [""],
        correctAnswer: 0, // Устанавливаем первый вариант по умолчанию правильным
      });
    },
    saveQuestions() {
      // Сохраняем все вопросы
      this.$emit("save-questions", this.questions); // Передаем вопросы в родительский компонент
      this.resetForm();
    },
    resetForm() {
      // Сброс формы после сохранения
      this.questions = [
        {
          text: "",
          required: false,
          answers: [""],
          correctAnswer: 0,
        },
      ];
    },
  },
});
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(100%);
}
</style>

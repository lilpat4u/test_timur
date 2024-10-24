<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold">Список тестов</h1>
    <div class="grid gap-4 mt-4">
      <!-- Выводим карточки тестов -->
      <div v-for="test in tests" :key="test.id" class="test-item">
        <div class="w-full p-4 bg-white rounded-lg shadow-lg">
          <!-- Название теста с возможностью редактирования -->
          <div v-if="test.isEditing">
            <input
              v-model="test.newTitle"
              type="text"
              @blur="saveTitle(test.id)"
              @keyup.enter="saveTitle(test.id)"
              class="input border-2 border-gray-300 rounded-md focus:border-gray-500 focus:outline-none"
              placeholder="Введите новое название"
            />
          </div>
          <div v-else>
            <h2 class="text-xl font-bold">{{ test.name }}</h2>
          </div>

          <!-- Кнопки управления тестом -->
          <div class="flex justify-between mt-2">
            <button @click="toggleQuestions(test.id)" class="btn-primary">
              {{ test.showQuestions ? "Скрыть вопросы" : "Посмотреть вопросы" }}
            </button>
            <button @click="onAddQuestion(test.id)" class="btn-secondary">Добавить вопрос</button>
            <button @click="deleteTest(test.id)" class="btn-secondary">Удалить тест</button>
            <button v-if="!test.isEditing" @click="editTitle(test.id)" class="btn-secondary">
              Редактировать название
            </button>
          </div>

          <!-- Список вопросов -->
          <div v-if="test.showQuestions" class="mt-4">
            <h3 class="font-bold">Вопросы:</h3>
            <ul>
              <li v-for="(question, index) in test.questions" :key="index">
                {{ index + 1 }}. {{ question.text }} (Ответы: {{ question.answers.join(", ") }})
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Сайдбар для добавления новых вопросов -->
    <Sidebar :visible="isSidebarOpen" @close="closeSidebar" @save-questions="saveQuestions" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Sidebar from "../components/Sidebar.vue";

interface Question {
  text: string;
  required: boolean;
  answers: string[];
  correctAnswer: number;
}

export default defineComponent({
  components: { Sidebar },
  setup() {
    const tests = ref([
      {
        id: 1,
        name: "Тест 1",
        newTitle: "Тест 1", // Для редактирования названия
        isEditing: false, // Флаг редактирования
        showQuestions: false,
        questions: [
          {
            text: "Что такое Vue?",
            required: true,
            answers: ["Фреймворк", "Библиотека"],
            correctAnswer: 0,
          },
        ],
      },
      {
        id: 2,
        name: "Тест 2",
        newTitle: "Тест 2",
        isEditing: false,
        showQuestions: false,
        questions: [
          {
            text: "Что такое React?",
            required: true,
            answers: ["Фреймворк", "Библиотека"],
            correctAnswer: 1,
          },
        ],
      },
    ]);

    const isSidebarOpen = ref(false);
    const currentTestId = ref<number | null>(null);

    // Показать/скрыть вопросы
    const toggleQuestions = (id: number) => {
      const test = tests.value.find((t) => t.id === id);
      if (test) {
        test.showQuestions = !test.showQuestions;
      }
    };

    // Редактировать название теста
    const editTitle = (id: number) => {
      const test = tests.value.find((t) => t.id === id);
      if (test) {
        test.isEditing = true;
      }
    };

    // Сохранить название теста
    const saveTitle = (id: number) => {
      const test = tests.value.find((t) => t.id === id);
      if (test && test.newTitle.trim() !== "") {
        test.name = test.newTitle; // Обновляем имя теста
        test.isEditing = false; // Выключаем режим редактирования
      }
    };

    // Удаление теста
    const deleteTest = (id: number) => {
      tests.value = tests.value.filter((t) => t.id !== id);
    };

    // Открыть сайдбар для добавления вопросов
    const onAddQuestion = (id: number) => {
      currentTestId.value = id;
      isSidebarOpen.value = true;
    };

    // Закрытие сайдбара
    const closeSidebar = () => {
      isSidebarOpen.value = false;
      currentTestId.value = null;
    };

    // Сохранение вопросов
    const saveQuestions = (questions: Question[]) => {
      const currentTest = tests.value.find((t) => t.id === currentTestId.value);
      if (currentTest) {
        // Добавляем новые вопросы в тест
        currentTest.questions.push(...questions);
      }
      closeSidebar();
    };

    return {
      tests,
      isSidebarOpen,
      toggleQuestions,
      editTitle,
      saveTitle,
      onAddQuestion,
      closeSidebar,
      saveQuestions,
      deleteTest,
    };
  },
});
</script>

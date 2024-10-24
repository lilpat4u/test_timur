<template>
  <div>
    <h1 class="text-2xl font-bold">Список вопросов для теста {{ testId }}</h1>
    <ul>
      <li v-for="(question, index) in questions" :key="index">{{ question.text }} - {{ question.correctAnswer }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, inject } from "vue";
import { useRoute } from "vue-router";

interface Question {
  text: string;
  required: boolean;
  answers: string[];
  correctAnswer: number;
}

export default defineComponent({
  setup() {
    const route = useRoute();
    const testId = ref(Number(route.query.testId));
    const questions = ref<Question[]>([]);

    // Инъекция данных из provide
    const injectedQuestions = inject<{ testId: number; questions: Question[] }[]>("questions");

    onMounted(() => {
      console.log("testId из маршрута:", testId.value);
      const testQuestions = injectedQuestions?.find((q) => q.testId === testId.value);
      if (testQuestions) {
        questions.value = testQuestions.questions;
        console.log("Найденные вопросы для теста:", testQuestions);
      } else {
        console.log("Вопросы не найдены для теста с testId:", testId.value);
      }
    });

    return {
      testId,
      questions,
    };
  },
});
</script>

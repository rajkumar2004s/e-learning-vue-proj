import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { Course } from "../types/Course";
import { useCourseStore } from "../stores/courses";

export interface Payment {
  id: string;
  courseId: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  createdAt: string;
}

export const usePaymentStore = defineStore("payment", () => {
  const payments = ref<Payment[]>([]);
  const currentPayment = ref<Payment | null>(null);

  // -------------------------------
  // LOAD FROM localStorage
  // -------------------------------
  const loadPayments = () => {
    const saved = localStorage.getItem("payments");
    if (saved) payments.value = JSON.parse(saved);
  };
  loadPayments();

  // -------------------------------
  // WATCH & SAVE TO localStorage
  // -------------------------------
  watch(
    payments,
    (val) => {
      localStorage.setItem("payments", JSON.stringify(val));
    },
    { deep: true }
  );

  // -------------------------------
  // ACTIONS
  // -------------------------------
  const startPayment = (course: Course) => {
    const payment: Payment = {
      id: crypto.randomUUID(),
      courseId: course.id,
      amount: course.price,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    currentPayment.value = payment;
    payments.value.push(payment);

    return payment;
  };

  const completePayment = () => {
    if (currentPayment.value) {
      currentPayment.value.status = "completed";

      // ✅ Enroll in course after payment success
      const courseStore = useCourseStore();
      const course = courseStore.courses.find(
        (c) => c.id === currentPayment.value?.courseId
      );
      if (course) {
        courseStore.enrollCourse(course);
      }

      currentPayment.value = null;
    }
  };

  const failPayment = () => {
    if (currentPayment.value) {
      currentPayment.value.status = "failed";
      currentPayment.value = null;
    }
  };

  return {
    payments,
    currentPayment,
    startPayment,
    completePayment,
    failPayment,
  };
});

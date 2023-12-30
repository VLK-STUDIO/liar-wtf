export default function useSecondsLeft(endsAt: number) {
  const timeLeft = ref(endsAt - Date.now());

  const max = Math.floor((endsAt - Date.now()) / 1000);

  onMounted(() => {
    const interval = setInterval(() => {
      timeLeft.value = endsAt - Date.now();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  const secondsLeft = computed(() => {
    const result = Math.floor(timeLeft.value / 1000);

    return result < 0 ? 0 : result;
  });

  return {
    secondsLeft,
    max,
  };
}

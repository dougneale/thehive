export const setTimer = (fn, interval) => window.setInterval(fn, interval)

export const resetTimer = (timer) =>  window.clearInterval(timer)
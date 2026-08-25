/* Camada de persistência.
   Dentro do Claude, window.storage já existe.
   Fora dele (Vercel), usamos localStorage com a mesma interface. */
if (typeof window !== "undefined" && !window.storage) {
  const K = (k) => `vtaper:${k}`;
  window.storage = {
    async get(key) {
      const v = localStorage.getItem(K(key));
      if (v === null) throw new Error("not found");
      return { key, value: v, shared: false };
    },
    async set(key, value) {
      localStorage.setItem(K(key), value);
      return { key, value, shared: false };
    },
    async delete(key) {
      localStorage.removeItem(K(key));
      return { key, deleted: true, shared: false };
    },
    async list(prefix = "") {
      const keys = Object.keys(localStorage)
        .filter((k) => k.startsWith(K(prefix)))
        .map((k) => k.slice(7));
      return { keys, prefix, shared: false };
    },
  };
}

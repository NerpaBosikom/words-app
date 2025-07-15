import { makeAutoObservable, runInAction } from "mobx";

class WordStore {
  words = [];
  isLoading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchWords() {
    this.error = null; // сбрасываем старую ошибку
    this.isLoading = true;
    try {
      const response = await fetch(
        "https://itgirlschool.justmakeit.ru/api/words/"
      );
      const data = await response.json();
      runInAction(() => {
        this.words = data;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = "Ошибка загрузки слов";
        this.isLoading = false;
      });
    }
  }

  async addWord(newWord) {
    try {
      const response = await fetch(
        "https://itgirlschool.justmakeit.ru/api/words/add",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newWord),
        }
      );
      if (response.ok) {
        await this.fetchWords();
      }
    } catch (e) {
      console.error("Ошибка добавления слова", e);
    }
  }

  async updateWord(id, updatedWord) {
    try {
      const response = await fetch(
        `https://itgirlschool.justmakeit.ru/api/words/${id}/update`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedWord),
        }
      );
      if (response.ok) {
        await this.fetchWords();
      }
    } catch (e) {
      console.error("Ошибка обновления слова", e);
    }
  }

  async deleteWord(id) {
    try {
      const response = await fetch(
        `https://itgirlschool.justmakeit.ru/api/words/${id}/delete`,
        {
          method: "POST",
        }
      );
      if (response.ok) {
        await this.fetchWords();
      }
    } catch (e) {
      console.error("Ошибка удаления слова", e);
    }
  }
}

const wordStore = new WordStore();
export default wordStore;

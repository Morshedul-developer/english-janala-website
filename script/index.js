const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};

const loadLevelWords = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayWords(data.data));
}

const displayLessons = (lessons) => {
  const lessonContainer = document.getElementById("lesson-container");
  lessonContainer.innerHTML = '';

  for (const lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button onclick="loadLevelWords('${lesson.level_no}')" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson -${lesson.level_no}</button>
    `;
    lessonContainer.appendChild(btnDiv);
  }
};

const displayWords = (words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';

    if(words.length == 0) {
        wordContainer.innerHTML = `
        <div class="col-span-full text-center py-16 space-y-4">
        <img class="mx-auto" src="./assets/alert-error.png" alt="error image">
        <p class="font-bangla text-gray-600">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <strong class="font-bangla text-4xl font-medium">নেক্সট Lesson এ যান</strong>
    </div>
        `;
    }

    words.forEach(word => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="bg-white shadow-sm p-14 rounded-xl text-center space-y-14 h-full">
        <div class="space-y-6">
          <h2 class="text-[32px] font-bold">${word.word ? word.word : "কোনো word পাওয়া যায়নি"}</h2>
          <p class="text-[20px] font-medium">Meaning / Pronunciation</p>
          <strong class="font-bangla text-[24px] font-semibold">"${word.meaning ? word.meaning : "কোনো meaning পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "কোনো pronunciation পাওয়া যায়নি"}"</strong>
        </div>
        <div class="flex justify-between items-center">
          <button class="btn bg-[#1A91FF]/10 hover:bg-[#1A91FF]/70"><i class="fa-solid fa-circle-info text-[16px]"></i></button>
          <button class="btn bg-[#1A91FF]/10 hover:bg-[#1A91FF]/70"><i class="fa-solid fa-volume-high text-[16px]"></i></button>
        </div>
      </div>
        `;
        wordContainer.append(div);
    });
}

loadLessons();

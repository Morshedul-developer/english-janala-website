const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};

const loadLevelWords = (id) => {
  showSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const clickedBtn = document.getElementById(`btn-${id}`);
      const allBtns = document.querySelectorAll(".btn-lesson");
      allBtns.forEach((btn) => btn.classList.add("btn-outline"));
      clickedBtn.classList.remove("btn-outline");
      displayWords(data.data);
    });
};

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  showDetails(details.data);
};

const showDetails = (details) => {
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
  <div class="p-4 border border-gray-100 rounded-xl space-y-8">
            <div>
              <h3 class="text-[32px] font-semibold">
                ${details.word} (<i class="fa-solid fa-microphone-lines"></i> : ${details.pronunciation})
              </h3>
            </div>
            <div class="space-y-2">
              <h4 class="text-[22px] font-semibold">Meaning</h4>
              <p class="text-[20px] font-medium">${details.meaning}</p>
            </div>
            <div class="space-y-2">
              <h4 class="text-[22px] font-semibold">Example</h4>
              <p class="text-[20px]">
                ${details.sentence}
              </p>
            </div>
            <div class="space-y-2">
              <h4 class="text-[22px] font-medium">সমার্থক শব্দ গুলো</h4>
              <div class="flex gap-4">
                ${showSynonyms(details.synonyms)}
              </div>
            </div>
          </div>
  `;
  document.getElementById("show_modal").showModal();
};

const displayLessons = (lessons) => {
  const lessonContainer = document.getElementById("lesson-container");
  lessonContainer.innerHTML = "";

  for (const lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button id="btn-${lesson.level_no}" onclick="loadLevelWords('${lesson.level_no}')" class="btn btn-outline btn-primary btn-lesson"><i class="fa-solid fa-book-open"></i> Lesson -${lesson.level_no}</button>
    `;
    lessonContainer.appendChild(btnDiv);
    // showSpinner(true);
  }
};

const displayWords = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `
        <div class="col-span-full text-center py-16 space-y-4">
        <img class="mx-auto" src="./assets/alert-error.png" alt="error image">
        <p class="font-bangla text-gray-600">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <strong class="font-bangla text-4xl font-medium">নেক্সট Lesson এ যান</strong>
    </div>
        `;
        showSpinner(false);
        return;
  }

  words.forEach((word) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="bg-white shadow-sm p-14 rounded-xl text-center space-y-14 h-full">
        <div class="space-y-6">
          <h2 class="text-[32px] font-bold">${word.word ? word.word : "কোনো word পাওয়া যায়নি"}</h2>
          <p class="text-[20px] font-medium">Meaning / Pronunciation</p>
          <strong class="font-bangla text-[24px] font-semibold">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "কোনো pronunciation পাওয়া যায়নি"}"</strong>
        </div>
        <div class="flex justify-between items-center">
          <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF]/10 hover:bg-[#1A91FF]/70"><i class="fa-solid fa-circle-info text-[16px]"></i></button>
          <button class="btn bg-[#1A91FF]/10 hover:bg-[#1A91FF]/70"><i class="fa-solid fa-volume-high text-[16px]"></i></button>
        </div>
      </div>
        `;
    wordContainer.append(div);
    showSpinner(false)
  });
};

const showSynonyms = (arr) => {
  const newElement = arr.map(
    (elem) =>
      `<span class="btn bg-[#1A91FF]/10 hover:bg-[#1A91FF]/70">${elem}</span>`,
  );
  return newElement.join(" ");
};

const showSpinner = (status) => {
  if (status == true) {
    document.getElementById('spinner').classList.remove('hidden');
    document.getElementById('word-container').classList.add('hidden');
  }
  else{
    document.getElementById('spinner').classList.add('hidden');
    document.getElementById('word-container').classList.remove('hidden');
  }
};

loadLessons();

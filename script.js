const papers = [
  {
    id: "paper-1",
    title: "Infomercial",
    term: "prelims",
    type: "video",
    topic: "Why should IT students care?",
    video: "videos/infomercial.mp4",
    poster: "images/infomercial-preview.jpg",
    captions: "",
    pages: []
  },
  {
    id: "paper-2",
    title: "Activity #1",
    term: "prelims",
    topic: "Function and graphs",
    expectedPages: 1,
    pages: ["images/activity-1/paper-2.jpg"]
  },
  {
    id: "paper-3",
    title: "Poster",
    term: "prelims",
    topic: "Function and graphs",
    expectedPages: 1,
    pages: ["images/poster/paper-3.png"]
  },
  {
    id: "paper-4",
    title: "Activity #2",
    term: "prelims",
    topic: "Limits",
    expectedPages: 2,
    pages: ["images/activity-2/page-01.jpg", "images/activity-2/page-02.jpg"]
  },
  {
    id: "paper-5",
    title: "Activity Card",
    term: "prelims",
    topic: "Limits",
    expectedPages: 22,
    pages: [
      "images/activity-card/page-01.jpg",
      "images/activity-card/page-02.jpg",
      "images/activity-card/page-03.jpg",
      "images/activity-card/page-04.jpg",
      "images/activity-card/page-05.png",
      "images/activity-card/page-06.jpg",
      "images/activity-card/page-07.jpg",
      "images/activity-card/page-08.jpg",
      "images/activity-card/page-09.jpg",
      "images/activity-card/page-10.jpg",
      "images/activity-card/page-11.jpg",
      "images/activity-card/page-12.jpg",
      "images/activity-card/page-13.jpg",
      "images/activity-card/page-14.jpg",
      "images/activity-card/page-15.jpg",
      "images/activity-card/page-16.jpg",
      "images/activity-card/page-17.jpg",
      "images/activity-card/page-18.jpg",
      "images/activity-card/page-19.jpg",
      "images/activity-card/page-20.jpg",
      "images/activity-card/page-21.jpg",
      "images/activity-card/page-22.png"
    ]
  },
  {
    id: "paper-6",
    title: "Prelims Test",
    term: "prelims",
    topic: "Prelim Exam",
    expectedPages: 2,
    pages: ["images/prelims-exam/page-01.jpg", "images/prelims-exam/page-02.jpg"]
  },
  {
    id: "paper-7",
    title: "Activity #4",
    term: "midterms",
    topic: "Rules of Differentiation",
    expectedPages: 1,
    pages: ["images/activity-4/paper-7.jpg"]
  },
  {
    id: "paper-8",
    title: "Activity #5",
    term: "midterms",
    topic: "Rules of Differentiation",
    expectedPages: 2,
    pages: ["images/activity-5/page-01.jpg", "images/activity-5/page-02.jpg"]
  },
  {
    id: "paper-9",
    title: "Activity #6",
    term: "midterms",
    topic: "Chain Rule",
    expectedPages: 1,
    pages: ["images/activity-6/paper-9.jpg"]
  },
  {
    id: "paper-10",
    title: "Midterms Test",
    term: "midterms",
    topic: "Midterm Exam",
    expectedPages: 2,
    pages: ["images/midterms-exam/page-01.jpg", "images/midterms-exam/page-02.jpg"]
  }
];

const termNames = {
  prelims: "Prelims",
  midterms: "Midterms",
  finals: "Finals"
};

// Small helper for adding text without changing the HTML structure.
function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function pageLabel(number) {
  return number + (number === 1 ? " page" : " pages");
}

function makePaperCard(paper) {
  const link = makeElement("a", "project-tile");
  link.href = "paper.html?paper=" + paper.id;

  const preview = makeElement("div", "paper-preview");
  const previewImage = paper.type === "video" ? paper.poster : paper.pages[0];
  if (previewImage) {
    const photo = makeElement("img");
    photo.src = previewImage;
    photo.alt = "Preview of " + paper.title;
    photo.loading = "lazy";
    photo.addEventListener("error", function () {
      preview.classList.add("cover-empty");
      preview.replaceChildren(makeElement("p", "", "Preview unavailable"));
    });
    preview.appendChild(photo);
  } else {
    preview.classList.add("cover-empty");
    const number = paper.id.replace("paper-", "");
    preview.appendChild(makeElement("span", "paper-number", number.padStart(2, "0")));
    let label = "Photos to be added";
    if (paper.type === "video") label = paper.video ? "Watch video" : "Video to be added";
    preview.appendChild(makeElement("p", "", label));
  }

  const info = makeElement("div", "paper-info");
  const text = makeElement("div");
  text.appendChild(makeElement("h4", "", paper.title));
  let detail = paper.topic || "Topic to be added";
  if (paper.type === "video") {
    detail += " / Video";
  } else if (paper.pages.length > 0) {
    detail += " / " + pageLabel(paper.pages.length);
  } else if (paper.expectedPages) {
    detail += " / " + pageLabel(paper.expectedPages) + " expected";
  }
  text.appendChild(makeElement("p", "", detail));
  info.appendChild(text);
  info.appendChild(makeElement("span", "paper-arrow", "→"));
  link.appendChild(preview);
  link.appendChild(info);
  return link;
}

function showPortfolio() {
  Object.keys(termNames).forEach(function (term) {
    const termPapers = papers.filter(function (paper) {
      return paper.term === term;
    });
    const grid = document.getElementById(term + "-papers");
    const count = document.getElementById(term + "-count");
    const topicList = document.getElementById(term + "-topics");
    if (termPapers.length === 0) {
      count.hidden = true;
      topicList.hidden = true;
      grid.hidden = true;
      return;
    }
    count.hidden = false;
    topicList.hidden = false;
    grid.hidden = false;
    count.textContent = termPapers.length + (termPapers.length === 1 ? " item" : " items");

    const topics = [];
    termPapers.forEach(function (paper) {
      grid.appendChild(makePaperCard(paper));
      if (paper.topic && !topics.includes(paper.topic)) topics.push(paper.topic);
    });
    if (topics.length > 0) {
      topicList.textContent = topics.join(" / ");
    } else {
      topicList.textContent = "Course topics to be added.";
    }
  });
}

function addPaperPage(path, index, paper) {
  const number = index + 1;
  const figure = makeElement("figure", "paper-page");
  figure.id = "page-" + number;

  const imageLink = makeElement("a");
  imageLink.href = path;

  const image = makeElement("img");
  image.src = path;
  image.alt = paper.title + ", page " + number;
  image.loading = index === 0 ? "eager" : "lazy";
  image.addEventListener("error", function () {
    imageLink.replaceWith(makeElement("p", "missing-page", "Page " + number + " is unavailable."));
    fullImageLink.hidden = true;
  });
  imageLink.appendChild(image);
  figure.appendChild(imageLink);

  const caption = makeElement("figcaption");
  caption.appendChild(makeElement("span", "", "Page " + number + " of " + paper.pages.length));
  const fullImageLink = makeElement("a", "", "Open original image →");
  fullImageLink.href = path;
  caption.appendChild(fullImageLink);
  figure.appendChild(caption);
  document.getElementById("paper-pages").appendChild(figure);

  const option = makeElement("option", "", "Page " + number);
  option.value = figure.id;
  document.getElementById("page-select").appendChild(option);
}

function showVideo(paper) {
  const container = document.getElementById("paper-pages");
  document.getElementById("page-count").textContent = "Video";
  if (!paper.video) {
    const empty = makeElement("div", "empty-paper");
    empty.appendChild(makeElement("h3", "", "Video to be added"));
    empty.appendChild(makeElement("p", "", "The infomercial will appear here."));
    container.appendChild(empty);
    return;
  }

  const video = makeElement("video", "paper-video");
  video.controls = true;
  video.preload = "metadata";
  video.src = paper.video;
  if (paper.poster) video.poster = paper.poster;
  if (paper.captions) {
    const track = makeElement("track");
    track.kind = "captions";
    track.srclang = "en";
    track.label = "English";
    track.src = paper.captions;
    track.default = true;
    video.appendChild(track);
  }
  const fallback = makeElement("a", "", "Open the video");
  fallback.href = paper.video;
  video.appendChild(fallback);

  const original = makeElement("a", "video-link", "Open original video →");
  original.href = paper.video;
  video.addEventListener("error", function () {
    video.replaceWith(makeElement("p", "missing-page", "The video is unavailable."));
    original.hidden = true;
  });
  container.appendChild(video);
  container.appendChild(original);
}

function showPaper() {
  const parameters = new URLSearchParams(window.location.search);
  const paper = papers.find(function (item) {
    return item.id === parameters.get("paper");
  });
  if (!paper) {
    document.getElementById("paper-not-found").hidden = false;
    document.title = "Activity not found | Jervee Manangan";
    return;
  }

  document.title = paper.title + " | Jervee Manangan";
  document.getElementById("paper-content").hidden = false;
  document.getElementById("paper-title").textContent = paper.title;
  document.getElementById("paper-term").textContent = termNames[paper.term] + " / 2CALC-IT";
  document.getElementById("paper-topic").textContent = "Topic: " + (paper.topic || "To be added");

  if (paper.type === "video") {
    showVideo(paper);
    return;
  }

  const count = document.getElementById("page-count");
  if (paper.pages.length === 0) {
    count.textContent = paper.expectedPages ? pageLabel(paper.expectedPages) + " expected" : "Paper pages";
    const empty = makeElement("div", "empty-paper");
    empty.appendChild(makeElement("h3", "", "No photos added yet"));
    const message = paper.expectedPages > 1
      ? "All " + paper.expectedPages + " photos for this activity will appear here in order."
      : "The photo for this activity will appear here.";
    empty.appendChild(makeElement("p", "", message));
    document.getElementById("paper-pages").appendChild(empty);
    return;
  }

  count.textContent = pageLabel(paper.pages.length);
  if (paper.expectedPages && paper.pages.length !== paper.expectedPages) {
    count.textContent += " added / " + paper.expectedPages + " expected";
  }
  paper.pages.forEach(function (path, index) {
    addPaperPage(path, index, paper);
  });
  if (paper.pages.length > 1) {
    document.getElementById("page-navigation").hidden = false;
    document.getElementById("page-select").addEventListener("change", function () {
      document.getElementById(this.value).scrollIntoView();
    });
  }
}

if (document.body.dataset.page === "portfolio") showPortfolio();
if (document.body.dataset.page === "paper") showPaper();

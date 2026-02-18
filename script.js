// 1. 데이터베이스: 변환될 단어들
const db = [
    "void", "infinity", "0101", "🌐", "labyrinth", "mirror", "sand", "pixel", "💾", "cloud", "dream", "cryptic", "dust", "page", "shadow", "system", "ERROR", "NULL", "∞", "portal", "archive", "ghost", "binary", "⌛", "mirrors", "infinite", "🌀", "library", "desert", "nothingness", "unknown", "✨", "grain", "👁️", "unending", "memory", "book", "Cambridge", "ten o'clock", "February", "1969", "the event", "took", "place", "I","made", "no", "attempt", "to" , "record", "it", "at", "the", "time",  "because",  "fearing",  "for",  "my", "mind", "initial",  "aim",  "was",  "to",  "forget",  "Now", "some", "years",  "later", "feel", "that", "if", "commit", "paper", "others", "will", "read", "as",  "a", "story",  "and",  "hope",  "one", "day",  "become",  "story", "for",  "me", "well.", "know", "horrifying", "while", "lasted", "even", "more",  "so",  "during",  "sleepless", "nights", "followed", "but", "this", "does not",  "mean",  "an account",  "of", "necessarily",  "move",  "anyone",  "else"
];

const youtubeLinks = [
    "https://youtu.be/teNm5MwHf1c?si=m4TDGhiMSATIs-Sb",
    "https://youtu.be/AumYP6Np1eI?si=huP_N86BtGaZmMwi",
    "https://youtu.be/3h-JYx76QNM?si=ceuRN1tBqboSFfSU",
    "https://youtu.be/tQ2l9zKInDY?si=TL1wXDMxpOel6ROI",
    "https://youtu.be/4IMsI0R5qPw?si=XeXGaBT25t9AyAfb"
];

const passages = [
    {
        full: "The line consists of an infinite number of points; the plane, of an infinite number of lines; the volume, of an infinite number of planes; the hypervolume, of an infinite number of volumes. No, this, more geometrico, is not the best way of beginning my story.",
        first: "The line consists of an infinite number of points;",
        last: "is not the best way of beginning my story."
    },
    {
        full: "He told me his book was called the Book of Sand, because neither the book nor the sand has any beginning or end. He suggested I look for the first page.",
        first: "He told me his book was called the Book of Sand,",
        last: "He suggested I look for the first page."
    },
    {
        full: "It was then that he told me: 'I acquired it in a town on the plains in exchange for a few rupees and a Bible. Its owner did not know how to read.'",
        first: "It was then that he told me:",
        last: "Its owner did not know how to read.'"
    },
    {
        full: "I was struck by a small illustration, an anchor drawn in pen and ink, as if by a schoolboy's hand. It was at this point that the stranger said: 'Look at it well. You will never see it again.'",
        first: "I was struck by a small illustration,",
        last: "You will never see it again.'"
    },
    {
        full: "If space is infinite, we may be at any point in space. If time is infinite, we may be at any point in time.",
        first: "If space is infinite,",
        last: "we may be at any point in time."
    },
    {
        full: "I remembered having read that the best place to hide a leaf is in a forest. Before retiring, I went to the National Library, which contained nine hundred thousand books; I knew that to the right of the entrance a curving staircase descends into the shadows of the basement.",
        first: "I remembered having read that the best place to hide a leaf is in a forest.",
        last: "descends into the shadows of the basement."
    },
    {
        full: "I felt a sense of relief, but I did not want even to walk down the street where it was hidden. Now, a prisoner of the book, I almost never leave my house.",
        first: "I felt a sense of relief,",
        last: "I almost never leave my house."
    }
];

let currentPassage;

// 랜덤 콘텐츠(이미지/단어) 생성
function getRandomContent() {
    if (Math.random() > 0.6) {
        const randomId = Math.floor(Math.random() * 1000);
        return `<img src="https://picsum.photos/seed/${randomId}/100/100" class="word-img" alt="random">`;
    } else {
        return db[Math.floor(Math.random() * db.length)];
    }
}

// 핵심 로직: REGENERATE 버튼의 운명 결정
function handleRegenerate() {
    // 0~1 사이의 난수를 생성하여 0.2 미만이면 유튜브, 아니면 문단 교체 (20% 확률)
    // 확률을 높이고 싶다면 0.2를 0.5 등으로 수정하세요.
    const fate = Math.random();

    if (fate < 0.2) {
        // 결과 1: 유튜브 미궁으로 이동
        const randomLink = youtubeLinks[Math.floor(Math.random() * youtubeLinks.length)];
        window.location.href = randomLink;
    } else {
        // 결과 2: 사이트 내에서 문단 무작위 교체
        init();
    }
}

function init() {
    const contentArea = document.getElementById('content-area');
    const congratsDiv = document.getElementById('congrats');
    
    // 이전과 다른 문단을 선택하도록 로직 보완
    let newPassage;
    do {
        newPassage = passages[Math.floor(Math.random() * passages.length)];
    } while (newPassage === currentPassage && passages.length > 1);
    
    currentPassage = newPassage;
    const words = currentPassage.full.split(" ");
    
    contentArea.innerHTML = "";
    congratsDiv.innerText = "";

    words.forEach((word) => {
        const span = document.createElement('span');
        span.className = "word-btn";
        span.dataset.correct = word;

        // 첫 문장과 마지막 문장 고정 로직
        const isFirstPart = currentPassage.first.includes(word);
        const isLastPart = currentPassage.last.includes(word);

        if (!isFirstPart && !isLastPart) {
            span.innerHTML = getRandomContent();
        } else {
            span.innerHTML = word;
        }

        span.onclick = () => {
            if (Math.random() > 0.7) {
                span.innerHTML = span.dataset.correct;
            } else {
                span.innerHTML = getRandomContent();
            }
            checkCompletion();
        };

        contentArea.appendChild(span);
        contentArea.appendChild(document.createTextNode(" "));
    });
}

function checkCompletion() {
    const allSpans = document.querySelectorAll('.word-btn');
    const congratsDiv = document.getElementById('congrats');
    const currentText = Array.from(allSpans).map(s => s.innerText.trim()).join(" ");
    const targetText = currentPassage.full.replace(/\s+/g, ' ').trim();

    if (currentText === targetText) {
        congratsDiv.innerText = "Congratulations. The book is infinite, and you have restored its order.";
    } else {
        congratsDiv.innerText = "";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('regen-btn').onclick = handleRegenerate;
    init();
});
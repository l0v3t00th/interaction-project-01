const db = [
    "void", "infinity", "0101", "🌐", "labyrinth", "mirror", "sand", "pixel", "💾", "cloud", "dream", "cryptic", "dust", "page", "shadow", "system", "ERROR", "NULL", "∞", "portal", "archive", "ghost", "binary", "⌛", "mirrors", "infinite", "🌀", "library", "desert", "nothingness", "unknown", "✨", "grain", "👁️", "unending", "memory", "book", "Cambridge", "ten o'clock", "February", "1969", "the event", "took", "place", "I","made", "no", "attempt", "to" , "record", "it", "at", "the", "time",  "because",  "fearing",  "for",  "my", "mind", "initial",  "aim",  "was",  "to",  "forget",  "Now", "some", "years",  "later", "feel", "that", "if", "commit", "paper", "others", "will", "read", "as",  "a", "story",  "and",  "hope",  "one", "day",  "become",  "story", "for",  "me", "well.", "know", "horrifying", "while", "lasted", "even", "more",  "so",  "during",  "sleepless", "nights", "followed", "but", "this", "does not",  "mean",  "an account",  "of", "necessarily",  "move",  "anyone",  "else"
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
    }
    // ... 추가 문단들
];

let currentPassage = passages[0];

function getRandomContent() {
    if (Math.random() > 0.6) {
        const randomId = Math.floor(Math.random() * 1000);
        return `<img src="https://picsum.photos/seed/${randomId}/100/100" class="word-img" alt="random">`;
    } else {
        return db[Math.floor(Math.random() * db.length)];
    }
}

function init() {
    const contentArea = document.getElementById('content-area');
    const congratsDiv = document.getElementById('congrats');
    
    // 에러 방지 체크
    if(!contentArea) return; 

    currentPassage = passages[Math.floor(Math.random() * passages.length)];
    const words = currentPassage.full.split(" ");
    
    contentArea.innerHTML = "";
    congratsDiv.innerText = "";

    words.forEach((word) => {
        const span = document.createElement('span');
        span.className = "word-btn";
        span.dataset.correct = word;

        if (!currentPassage.first.includes(word) && !currentPassage.last.includes(word)) {
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
    const visibleText = Array.from(allSpans).map(s => s.innerText).join(" ");
    const congratsDiv = document.getElementById('congrats');
    
    if (visibleText.includes(currentPassage.first) && visibleText.includes(currentPassage.last)) {
        congratsDiv.innerText = "Congratulations. The book is infinite, and you have restored its order.";
    }
}

// 안전한 실행: HTML이 완전히 로드된 후 실행됩니다.
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('regen-btn').onclick = init;
    init();
});
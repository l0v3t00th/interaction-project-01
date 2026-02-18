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
    
    currentPassage = passages[Math.floor(Math.random() * passages.length)];
    const words = currentPassage.full.split(" ");
    
    contentArea.innerHTML = "";
    congratsDiv.innerText = "";

    words.forEach((word) => {
        const span = document.createElement('span');
        span.className = "word-btn";
        span.dataset.correct = word;

        // 첫 문장과 마지막 문장에 포함되지 않은 단어들은 랜덤하게 섞어 시작
        const isFirstPart = currentPassage.first.includes(word);
        const isLastPart = currentPassage.last.includes(word);

        if (!isFirstPart && !isLastPart) {
            span.innerHTML = getRandomContent();
        } else {
            span.innerHTML = word;
        }

        span.onclick = () => {
            // 클릭 시 30% 확률로 정답, 70% 확률로 무작위 변경
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
        congratsDiv.innerText = ""; // 일치하지 않으면 메시지 즉시 삭제
    }
}


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('regen-btn').onclick = init;
    init();
});
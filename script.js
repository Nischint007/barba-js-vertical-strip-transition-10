const overlay = document.querySelector("#overlay");

for (let i = 0; i < 40; i++) {
  const div = document.createElement("div");
  div.classList.add("block");
  overlay.appendChild(div);
}

const blocks = document.querySelectorAll(".block");

gsap.set(blocks, {
  clipPath: "inset(101% 0% 0% 0%)"
});

function blocksIn() {
  return gsap.to(blocks, {
    clipPath: "inset(0% 0% 0% 0%)",
    duration: 1.1,
    stagger: {
      amount: 0.6,
      from: "random"
    },
    ease: "power3.inOut"
  });
}

function blocksOut() {
  return gsap.to(blocks, {
    clipPath: "inset(0% 0% 101% 0%)",
    duration: 1,
    stagger: {
      amount: 0.6,
      from: "random"
    },
    ease: "power4.inOut",
    onComplete: () => {
      gsap.set(blocks, {
        clipPath: "inset(101% 0% 0% 0%)"
      });
    }
  });
}

barba.init({
  transitions: [{
    async leave(data) {
      await blocksIn();
      data.current.container.remove();
    },

    async enter() {
      await blocksOut();
    }
  }]
});
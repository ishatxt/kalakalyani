      /* ---------- Mobile Menu ---------- */
      (function () {
        const b = document.getElementById("burger"),
          m = document.getElementById("mobile");
        if (!b) return;
        b.addEventListener("click", () => {
          b.classList.toggle("open");
          m.classList.toggle("open");
          b.setAttribute("aria-expanded", m.classList.contains("open"));
        });
        m.querySelectorAll("a").forEach((a) =>
          a.addEventListener("click", () => {
            b.classList.remove("open");
            m.classList.remove("open");
            b.setAttribute("aria-expanded", "false");
          })
        );
      })();

      /* ---------- Reveal on scroll ---------- */
      (function () {
        const io = new IntersectionObserver(
          (es) => {
            es.forEach((e) => {
              if (e.isIntersecting) {
                e.target.classList.add("in");
                io.unobserve(e.target);
              }
            });
          },
          { threshold: 0.12 }
        );
        document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
      })();

      /* ---------- Counters ---------- */
      (function () {
        const io = new IntersectionObserver(
          (es) => {
            es.forEach((e) => {
              if (e.isIntersecting) {
                const el = e.target,
                  end = +el.dataset.count,
                  dur = 1300,
                  t0 = performance.now();
                (function s(t) {
                  const p = Math.min(1, (t - t0) / dur);
                  el.textContent = Math.floor(p * end) + (p === 1 ? "+" : "");
                  if (p < 1) requestAnimationFrame(s);
                })(t0);
                io.unobserve(el);
              }
            });
          },
          { threshold: 0.5 }
        );
        document.querySelectorAll("[data-count]").forEach((el) => io.observe(el));
      })();

      /* ---------- FAQ ---------- */
      document.querySelectorAll(".faq-q").forEach((btn) => {
        btn.addEventListener("click", function () {
          const item = this.closest(".faq-item");
          const isOpen = item.classList.contains("open");
          document.querySelectorAll(".faq-item.open").forEach((o) => {
            o.classList.remove("open");
            o.querySelector(".faq-a").style.maxHeight = null;
          });
          if (!isOpen) {
            item.classList.add("open");
            const a = item.querySelector(".faq-a");
            a.style.maxHeight = a.scrollHeight + "px";
          }
        });
      });

      /* ---------- Year ---------- */
      document.getElementById("yr").textContent = new Date().getFullYear();

      /* ---------- Starting point check-in ---------- */
      (function () {
        const priceEl = document.getElementById("est-price"),
          timeEl = document.getElementById("est-time");
        if (!priceEl) return;
        document.querySelectorAll(".est-opts").forEach((group) => {
          const isExtras = group.dataset.group === "extras";
          group.querySelectorAll(".est-opt").forEach((opt) => {
            opt.addEventListener("click", function () {
              if (!isExtras) {
                group.querySelectorAll(".est-opt").forEach((o) =>
                  o.classList.remove("selected")
                );
                this.classList.add("selected");
              } else {
                if (this.dataset.price === "0") {
                  group.querySelectorAll(".est-opt").forEach((o) =>
                    o.classList.remove("selected")
                  );
                  this.classList.add("selected");
                } else {
                  group.querySelector('[data-price="0"]').classList.remove("selected");
                  this.classList.toggle("selected");
                  if (!group.querySelector(".selected"))
                    group.querySelector('[data-price="0"]').classList.add("selected");
                }
              }
              recalc();
            });
          });
        });
        function recalc() {
          let total = 0,
            weeks = 0;
          document.querySelectorAll(".est-opt.selected").forEach((o) => {
            total += parseInt(o.dataset.price || 0);
            weeks += parseInt(o.dataset.time || 0);
          });
          total = Math.max(total, 600);
          weeks = Math.max(weeks, 1);
          const hi = total * 1.3;
          priceEl.textContent =
            "Rs " +
            total.toLocaleString("en-IN") +
            " - Rs " +
            Math.round(hi).toLocaleString("en-IN");
          timeEl.textContent =
            "about " + (weeks == 1 ? "1 session" : weeks + " sessions");
        }
        recalc();
      })();

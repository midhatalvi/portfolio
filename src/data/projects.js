// Single source of truth for Featured Work + the detail pages.
// Wrap key words in **double asterisks** to bold them (ADHD-friendly scanning).
// Add a project by copying one block and changing the fields. slug = URL.

export const projects = [
  {
    slug: "tyler",
    eyebrow: "PROFESSIONAL · 2026 · Robotics",
    org: "Human Friendly Robotics",
    title: "TYLER — Autonomous Tiling Robot",
    headline: "3–5×",
    unit: "crew output",
    cap: "a supervised-autonomous tiling robot that lays commercial floor tile at production scale",
    blurb:
      "The robot I build hardware for at HFR: **body panels, brackets, and end-effectors** in **Fusion 360**, the **RoboClaw + Arduino** control stack, and the **material-delivery** subsystem that keeps thinset flowing.",
    image: "/images/tyler-black.jpg",
    hasImage: true,
    // Fleet showcase: white TYLER, black TYLER, Wattson box-rover, Wattson puller (2 angles)
    gallery: [
      "/images/tyler-white.jpg",
      "/images/tyler-black.jpg",
      "/images/wattson-high.jpg",
      "/images/wattson-puller-1.jpg",
      "/images/wattson-puller-2.jpg",
    ],
    tags: ["Fusion 360", "3D Printing", "RoboClaw", "Arduino", "End-Effector", "Harness Fab"],
    specs: [
      ["Machine", "TYLER, autonomous tiling robot"],
      ["Output", "3–5× tile output per crew"],
      ["System weight", "88 lb"],
      ["Footprint", "43 × 15 × 22 in"],
      ["Tile range", "12 × 12 in to 24 × 24 in"],
      ["Operation", "Supervised autonomous"],
      ["Design tools", "Fusion 360, FDM print"],
      ["Control stack", "RoboClaw + Arduino"],
      ["What I did", "Mech design + electrical integration"],
    ],
    sections: [
      {
        h: "The problem",
        p: "Tile installation is slow, physical, and inconsistent from crew to crew. **TYLER** turns it into a **production-level system**, but only if the hardware survives a real jobsite: dust, uneven substrate, and the pace of active construction. That meant every panel, mount, and subsystem had to be **built for fit, manufacturability, and serviceability**, not a lab bench.",
      },
      {
        h: "What I did",
        p: "I design the robot's **custom body panels, brackets, and mounts in Fusion 360**, 3D print them, and assemble them with off-the-shelf structural components. I integrate the **embedded electrical and control systems** (RoboClaw motor controllers, Arduino, wireless communication, sensors, and power distribution) through wiring, soldering, and harness fabrication. I also design and iterate the **end-effector and material-delivery subsystems**, working the real constraints: alignment accuracy, thinset flow consistency, and mechanical stability.",
      },
      {
        h: "Outcome",
        p: "The robot runs under real construction-site conditions. I run **system-level testing and validation**, identifying and resolving issues in drive performance, communication, and positioning, and I support **pilot deployments and live customer demos**, troubleshooting in real time and translating contractor feedback into design improvements toward field readiness.",
      },
    ],
    links: [],
  },

  {
    slug: "arm",
    eyebrow: "PERSONAL · 2026 · Robotics",
    org: "Personal project",
    title: "Autonomous Checkers-Playing Robot Arm (In Progress)",
    headline: "4",
    unit: "DOF + gripper",
    cap: "a vision-guided robot arm built to play checkers with my grandfather",
    blurb:
      "A personal **robot arm** that reads a **checkers board** and plays its move, built to keep my grandfather's mind sharp. Runs **stereo-vision depth** and **hand-eye calibration** on **OpenCV and Python**.",
    image: "/images/arm-placeholder.svg",
    hasImage: true,
    tags: ["ROS 2", "SLAM", "OpenCV", "Computer Vision", "Stereo Vision", "Python", "Raspberry Pi 5", "Fusion 360"],
    specs: [
      ["Architecture", "4 DOF + gripper (5 servos)"],
      ["Reach", "240 mm"],
      ["Tip accuracy", "3.1 mm (from 4.8 mm)"],
      ["Shoulder load", "0.95× of budget (no counterbalance)"],
      ["Depth error", "2.7 mm at 1 m"],
      ["Compute", "Raspberry Pi 5 (4GB) + Fusion HAT+"],
      ["Cameras", "2× Arducam OV5647, 54° stereo"],
      ["Depth method", "OpenCV SGBM"],
      ["Board", "6×6, 27 mm squares"],
      ["Total build", "Under $237"],
      ["Status", "In progress"],
    ],
    sections: [
      {
        h: "Overview",
        p: "I am building a **vision-guided robot arm** to play **checkers with my grandfather**, giving him an opponent on demand to keep his mind engaged and sharp. The arm reads the board through **stereo cameras**, works out its move, and physically plays it, turning a familiar game into **daily cognitive exercise** and shared time together.",
      },
      {
        h: "How it works",
        p: "The arm sees in **3D** using a pair of low-cost cameras and **classical computer vision**, locates each piece on the board, and reaches to it with **hand-eye calibration** so it moves exactly where it intends to.",
      },
      {
        h: "Engineering highlights",
        bullets: [
          "Redesigned the arm from **6 DOF to 4 DOF**, bringing it within the servo torque budget without a counterbalance and improving tip accuracy to **3.1 mm**, precise enough to pick a single checkers piece.",
          "Achieved **2.7 mm stereo depth error at one meter** using inexpensive cameras and **OpenCV**, outperforming a $200 synced-camera bundle.",
          "Designed the full build to come in **under $237**.",
        ],
      },
      {
        h: "Roadmap",
        p: "Arm assembly, the **stereo depth pipeline**, **hand-eye calibration**, and full **checkers play** against a human, then extending the same platform to **object recognition** and **room mapping** on a mobile base.",
      },
    ],
    links: [],
  },

  {
    slug: "tunnel",
    eyebrow: "M.ENG PROJECT · 2025 · Aerodynamics",
    org: "Rutgers · M.Eng (sole author)",
    title: "Subsonic Open-Circuit Wind Tunnel",
    headline: "8:1",
    unit: "contraction",
    cap: "Bell–Mehta contraction + three-level CFD, built to study Tollmien–Schlichting waves",
    blurb:
      "A **6 × 6 in**, **open-return** tunnel I designed to study **boundary-layer transition** — with an **8:1 Bell–Mehta** contraction and **three levels of CFD**.",
    image: "/images/tunnel.jpg",
    hasImage: true,
    gallery: ["/images/tunnel.jpg", "/images/tunnel-cfd.jpg"],
    tags: ["SolidWorks", "ANSYS Fluent", "Bell–Mehta", "CFD", "3D Printing", "DFM"],
    specs: [
      ["Type", "Subsonic, open-return"],
      ["Test section", "6 × 6 in"],
      ["Test velocity", "≤ 5 m/s"],
      ["Contraction ratio", "8 : 1"],
      ["Contraction profile", "Bell–Mehta 5th-order"],
      ["Settling chamber", "Honeycomb + mesh screen"],
      ["Diffuser", "6″→15″, ~6° half-angle"],
      ["Drive", "Variable-speed blower"],
      ["CFD", "Inviscid / laminar / RANS k-ε"],
      ["Deliverables", "Design + CFD + BOM"],
    ],
    sections: [
      {
        h: "The problem",
        p: "A wind tunnel is only worth building if the flow in the test section is **clean and repeatable**. The target here was hard: hold a **laminar, ≤5 m/s** stream steady enough to grow **Tollmien–Schlichting waves** — the first ripples of turbulence — without the contraction **separating** the boundary layer.",
      },
      {
        h: "What I did",
        p: "I designed the tunnel end to end: a **6 × 6 in** test section, an **8:1 Bell–Mehta** polynomial contraction to keep the boundary layer attached, a **honeycomb-and-mesh** settling chamber, and a **~6° diffuser** for pressure recovery. I modeled every part in **SolidWorks** for a **modular, 3D-printed and sheet-metal** build, then validated the aerodynamics with **three levels of CFD** in ANSYS — **inviscid, laminar, and RANS k-ε**.",
      },
      {
        h: "Outcome",
        p: "Across all three CFD levels the flow **accelerated cleanly through the contraction**, held a **uniform profile across the test section**, and **decelerated smoothly** through the diffuser with no separation — exactly the **low-disturbance environment** transition research needs. That matters because clean, repeatable flow is the whole precondition for the science: only in a **quiet stream** can you watch a **laminar boundary layer tip into turbulence** and measure those **Tollmien–Schlichting waves** against theory. The output is a **complete, costed, build-ready design** — every part modeled and a **full bill of materials** priced — that becomes a working research instrument the moment it is fabricated, and its next life is a Rutgers lab tool for **boundary-layer transition and CFD-validation** studies.",
      },
    ],
    links: [],
  },

  {
    slug: "engine",
    eyebrow: "CAPSTONE · 2023–24 · Propulsion",
    org: "Rutgers · Senior Design (5-person team)",
    title: "Bi-Propellant Liquid Rocket Engine",
    headline: "1,000",
    unit: "N thrust",
    cap: "Rutgers' first liquid rocket engine — a pressure-fed RP-1 / nitrous bipropellant",
    blurb:
      "Rutgers' **first liquid rocket engine**: a **1,000 N** pressure-fed **RP-1 / nitrous** bipropellant. I wrote the **MATLAB sizing code** that set its dimensions.",
    image: "/images/engine.jpg",
    hasImage: true,
    gallery: ["/images/engine.jpg", "/images/engine-assembly.jpg"],
    tags: ["MATLAB", "RPA", "NASA CEA", "Bell Nozzle", "Ablative Cooling"],
    specs: [
      ["Design thrust", "1,000 N"],
      ["Burn time", "10 s"],
      ["Propellants", "RP-1 / nitrous (N2O)"],
      ["Pressurant", "Nitrogen (purge)"],
      ["O / F ratio", "4 : 1"],
      ["Specific impulse", "195 s"],
      ["Chamber temp", "2,399 K (NASA CEA)"],
      ["Cooling", "Graphite ablative + film"],
      ["Nozzle", "Bell / parabolic"],
      ["What I did", "MATLAB sizing + RPA"],
    ],
    sections: [
      {
        h: "The problem",
        p: "A liquid engine lives or dies on **heat and geometry**. Pick the wrong **oxidizer-to-fuel ratio** or throat size and the **2,400 K** chamber melts, or the thrust never reaches target. This was also **Rutgers' first-ever liquid rocket engine**, so there was no in-house playbook to copy.",
      },
      {
        h: "What I did",
        p: "I built the **MATLAB sizing code** that turned the **1,000 N** thrust target into real engine dimensions — the **throat, chamber, and bell nozzle** — and validated every value against **RPA** (Rocket Propulsion Analysis). The nozzle-geometry figure comes straight out of that sizing work.",
      },
      {
        h: "Outcome",
        p: "The sizing code converged on a buildable, **pressure-fed RP-1 / nitrous** design with **graphite ablative + film cooling**, a **4:1** O/F ratio, and a **195 s** specific impulse. The design cleared its critical design review and set up the **cold-flow and hot-fire** test campaign.",
      },
    ],
    links: [],
  },
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}

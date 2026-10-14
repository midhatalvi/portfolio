// Single source of truth for Featured Work + the detail pages.
// Wrap key words in **double asterisks** to bold them (ADHD-friendly scanning).
// Add a project by copying one block and changing the fields. slug = URL.

export const projects = [
  {
    slug: "tyler",
    eyebrow: "Professional · 2026 · Robotics",
    org: "Human Friendly Robotics",
    title: "TYLER, autonomous tiling robot",
    headline: "3–5×",
    unit: "crew output",
    cap: "a supervised-autonomous tiling robot placing ceramic, vinyl, and carpet to sub-centimeter accuracy",
    blurb:
      "The hardware I design across HFR's robot fleet: per-material end-effectors, custom robot bodies, and the RoboClaw control stack, placing flooring to **sub-centimeter accuracy** at roughly **170 sq ft/day**.",
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
      ["Materials", "Ceramic, vinyl, carpet"],
      ["End-effectors", "Dedicated design per material"],
      ["Grip sensing", "Pressure transducer per vacuum cup"],
      ["Placement", "Sub-centimeter accuracy"],
      ["Throughput", "~170 sq ft/day, supervised"],
      ["Actuation", "3 servos (Z, tilt, roll)"],
      ["Serviceability", "Tyler redesign: 45→15 min (75%)"],
      ["Fleet", "Tyler (floor), Morty (mortar bed), Wattson (wire)"],
      ["Design + control", "Fusion 360, RoboClaw, FDM print"],
    ],
    sections: [
      {
        h: "The challenge",
        p: "TYLER places tile and plank to **sub-centimeter accuracy** across ceramic, vinyl, and carpet, and the three grip nothing alike, so each needs its own end-effector. I inherited the ceramic grip and optimized the two that do not cooperate, carpet and vinyl. The hardware also has to survive a real jobsite: dust, uneven substrate, and the pace of active construction.",
      },
      {
        h: "Ceramic: the suction baseline",
        p: "Ceramic is rigid, so the inherited vacuum grip seals against it cleanly and never fought me. What I added was a sense of its own hold: I plumbed a **pressure transducer** into the suction line so the robot only lifts once it reads a true seal, and holds instead of dropping a tile when the pull is weak.",
      },
      {
        h: "Carpet: a client deadline",
        p: "When a client came to us needing TYLER to place carpet, I had about **two weeks** to take the end-effector from first concept to a finished metal design. Carpet is porous, so the suction that holds ceramic and vinyl could not seal against it, and I pivoted the attachment to a **Velcro grip** on the backing. It held, but the fully 3D-printed structure would not keep the pad flat under load. I root-caused that to a **tolerance stack-up** across several FDM parts plus a printed-to-metal NPT fitting, reasoned that a precision plane does not belong on a printed part, and moved the rigid structure to an off-the-shelf metal frame, keeping only the custom mounts printed and driving Z, tilt, and roll with three servos.",
      },
      {
        h: "Vinyl: killing the warp",
        p: "Vinyl plank sags, and my first pad was too large, so the suction **warped the plank** enough that the camera could not find the seam. I **shrank the pad** to keep the plank flat, and designed the set-down to tilt and lower together so the plank rolls flat onto the seam instead of slamming a corner down first.",
      },
      {
        h: "Across the fleet",
        p: "Beyond the end-effector, I design the full physical body of HFR's robots, and because Tyler, Morty, and Wattson are different machines, each gets its own exterior redesigned from the ground up. **Tyler** is the flagship tiling robot I own end to end; **Morty** is its second generation, which extends the platform to laying the mortar bed the tile sets into; and **Wattson** is a different machine entirely, a two-robot wire-pulling system, a feeder and a puller that run electrical wire through a building. My scope is the physical robot: body panels, brackets, and mounts in Fusion 360, 3D printed, and the control box I wire and solder myself. Tyler began as an older inherited model, and I redesigned its body to cut service time **75 percent, from 45 minutes to 15**. With Morty and Wattson I built that lesson in from the start, designing each body so every service point is accessible by default rather than retrofitted.",
      },
    ],
    links: [],
  },

  {
    slug: "arm",
    eyebrow: "Personal · 2026 · Robotics",
    org: "Personal project",
    title: "Autonomous checkers-playing robot arm (in progress)",
    headline: "4",
    unit: "DOF + gripper",
    cap: "a vision-guided robot arm built to play checkers with my grandfather",
    blurb:
      "A personal robot arm that reads a **checkers board** and plays its move, built to keep my grandfather's mind sharp. Runs stereo-vision depth and **hand-eye calibration** on OpenCV and Python.",
    image: "/images/arm.png",
    // Tile crop framing. 0% = show top, 100% = show bottom. Tweak the number to taste.
    imgPos: "center 72%",
    hasImage: true,
    tags: ["ROS 2", "SLAM", "OpenCV", "Computer Vision", "Stereo Vision", "Python", "Raspberry Pi 5", "Fusion 360"],
    specs: [
      ["Architecture", "4 DOF + gripper (5 servos)"],
      ["Reach", "240 mm"],
      ["Tip accuracy", "3.1 mm (target)"],
      ["Shoulder load", "0.95× of budget (no counterbalance)"],
      ["Depth error", "2.7 mm at 1 m (target)"],
      ["Compute", "Raspberry Pi 5 (4GB) + Fusion HAT+"],
      ["Cameras", "2× Arducam OV5647, 54° stereo"],
      ["Depth method", "OpenCV SGBM"],
      ["Board", "6×6, 27 mm squares"],
      ["Total build", "Under $237"],
      ["Status", "In progress"],
    ],
    sections: [
      {
        h: "Why I'm building it",
        p: "I am building a vision-guided robot arm to play **checkers with my grandfather**, giving him an opponent on demand to keep his mind engaged and sharp. The arm reads the board through stereo cameras, works out its move, and physically plays it, turning a familiar game into daily cognitive exercise and shared time together.",
      },
      {
        h: "How it works",
        p: "The arm sees in 3D using a pair of low-cost cameras and classical computer vision, locates each piece on the board, and reaches to it with **hand-eye calibration** so it moves exactly where it intends to.",
      },
      {
        h: "Engineering decisions",
        bullets: [
          "Redesigned the arm from **6 DOF to 4 DOF**, bringing it within the servo torque budget without a counterbalance and targeting **3.1 mm** tip accuracy, precise enough to pick a single checkers piece.",
          "Selected a 54° stereo camera pair with OpenCV, targeting **2.7 mm** depth error at one meter versus 3.6 mm from a $200 synced-camera bundle.",
          "Designed the full build to come in **under $237**.",
        ],
      },
      {
        h: "Roadmap",
        p: "Arm assembly, the stereo depth pipeline, hand-eye calibration, and full **checkers play** against a human, then extending the same platform to object recognition and room mapping on a mobile base.",
      },
    ],
    links: [],
  },

  {
    slug: "tunnel",
    eyebrow: "M.Eng project · 2025 · Aerodynamics",
    org: "Rutgers · M.Eng (sole author)",
    title: "Subsonic open-circuit wind tunnel",
    headline: "8:1",
    unit: "contraction",
    cap: "Bell–Mehta contraction + three-level CFD, built to study Tollmien–Schlichting waves",
    blurb:
      "A **6 × 6 in** open-return tunnel I designed to study boundary-layer transition, with an **8:1** Bell–Mehta contraction and three levels of CFD.",
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
        h: "A hard flow target",
        p: "A wind tunnel is only useful if the test-section flow is clean and repeatable. My target was a hard one: a laminar, **5 m/s** stream steady enough to grow **Tollmien–Schlichting waves**, the first ripples of turbulence, without the contraction separating the boundary layer. So I designed the tunnel from requirements and proved it before anyone fabricated a part.",
      },
      {
        h: "Designing from requirements",
        p: "I sized an **8:1** Bell–Mehta contraction to accelerate the flow without separation, a honeycomb-and-mesh settling chamber, and a six-degree diffuser for pressure recovery, modeling every part in SolidWorks. I then validated the aerodynamics with **three levels of CFD** in ANSYS: inviscid, laminar, and RANS k-ε.",
      },
      {
        h: "What the CFD showed",
        p: "Across all three levels the flow accelerated cleanly through the contraction, held a uniform profile across the test section, and decelerated without separation, exactly the low-disturbance environment boundary-layer transition research needs. The result is a **build-ready design** that becomes a working research instrument the moment it is fabricated, and its next life is a Rutgers lab tool for boundary-layer transition and CFD-validation studies.",
      },
    ],
    links: [],
  },

  {
    slug: "engine",
    eyebrow: "Capstone · 2023–24 · Propulsion",
    org: "Rutgers · Senior Design (5-person team)",
    title: "Bi-propellant liquid rocket engine",
    headline: "1,000",
    unit: "N thrust",
    cap: "Rutgers' first liquid rocket engine, where I root-caused a sizing discrepancy to the propellant chemistry",
    blurb:
      "Rutgers' first liquid rocket engine: a **1,000 N** pressure-fed RP-1 / nitrous bipropellant. When RPA and the team's MATLAB sizing disagreed, I redid the sizing by hand and traced the gap to the **propellant chemistry**.",
    image: "/images/engine-assembly.jpg",
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
      ["My role", "Root-caused sizing: hand calc + RPA/CEA"],
    ],
    sections: [
      {
        h: "A sizing that didn't agree",
        p: "For Rutgers' first liquid rocket engine, a **1,000 N** RP-1 and nitrous design, RPA and NASA CEA disagreed with a teammate's MATLAB sizing even though both came from the same reference, and the entire chamber geometry depended on resolving it. The project lead asked me to step in.",
      },
      {
        h: "Tracing it to the chemistry",
        p: "I redid the full sizing by hand and traced the gap to the **propellant chemistry**: the MATLAB had used generic online values, while the real RP-1 and nitrous reaction differs. I re-derived the combustion products from a balanced stoichiometric equation that RPA needs stated explicitly.",
      },
      {
        h: "Convergence, and a cleared review",
        p: "With the corrected chemistry, the hand calculation and RPA converged and the sizing closed: a **4:1** oxidizer-to-fuel ratio and roughly **195 s** specific impulse, with graphite ablative and film cooling. The design cleared its critical design review.",
      },
    ],
    links: [],
  },
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}

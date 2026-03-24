# AGENTS.md

## Purpose

This repository uses Codex to help generate and organize a **large, style-consistent sprite set** for a vocabulary-learning mobile app.

The target deliverable is a batch of **160 transparent PNG character images**:

- 8 elemental types
- 4 part-of-speech body categories
- 5 evolution stages
- Total: `8 × 4 × 5 = 160`

The output is a set of **cute, front-facing, chibi spirit characters** suitable for a teenage girl audience, to be used as in-app sprites/icons in a React Native / Expo application.

---

## Primary Goal

When asked to generate image prompts, batch jobs, manifests, or automation scripts, always optimize for these four outcomes:

1. **Cross-image style consistency**
2. **Deterministic naming and traceability**
3. **Batchability** for repeated generation workflows
4. **Acceptance-ready output** with validation rules

Do not optimize for novelty at the expense of consistency.

---

## Non-Negotiable Art Direction

Every generated spirit must follow these global constraints:

- Style: **Chibi / Q-version cartoon**
- Aesthetic reference: cute creature collectible game icons
- Rendering: **simple clean lines + cel shading**
- Canvas: **512×512 px**
- Background: **transparent PNG**
- Composition: **front-facing, centered**
- Lighting: soft, minimal shadow under character only
- Tone: **cute, friendly, magical, not scary**
- Audience fit: **teenage girls / middle-school girls**
- Output scope: **character only**

### Never include

- text
- UI elements
- frames / borders
- backgrounds / scenery
- weapons that make the character threatening
- horror features, gore, sharp monster teeth, realistic claws
- off-center composition
- side profile unless explicitly requested
- inconsistent rendering style between batches

---

## Image Matrix

### Element Types

| type | label | main color | accent color | signature motifs |
|---|---|---|---|---|
| `flame` | Flame | `#ef4444` | `#fbbf24` | head flame, tail fire wisps, fire body markings |
| `aqua` | Aqua | `#3b82f6` | `#93c5fd` | droplet markings, jelly-like surface, splash details |
| `nature` | Nature | `#22c55e` | `#86efac` | leaf/bud on head, vine markings, earthy spots |
| `thunder` | Thunder | `#eab308` | `#fde047` | lightning antenna/tail, electric circuit markings, glow |
| `bloom` | Bloom | `#ec4899` | `#f9a8d4` | petals, flower crown, floral markings, ribbon accents |
| `star` | Star | `#a855f7` | `#c4b5fd` | star eyes, stardust, floating stars, magic motifs |
| `moon` | Moon | `#6366f1` | `#a5b4fc` | crescent shapes, translucent feel, night-sky texture |
| `crystal` | Crystal | `#06b6d4` | `#67e8f9` | crystal shards, faceted edges, refraction sparkle |

### POS Body Categories

| pos | body rule | silhouette rule | core feeling |
|---|---|---|---|
| `noun` | round, chubby, animal-like | stubby limbs, big eyes, cute ears/antennae | cuddly |
| `verb` | action-oriented | clearer limbs, dynamic pose, motion cues, tail/cape | energetic |
| `adj` | floating / elegant | wings, halo, stars, lighter silhouette | graceful |
| `func` | geometric / spirit-like | rhombus / hexagon / crystal body, glowing lines | mystical |

### Evolution Stages

| stage | name | relative size | complexity | expression | special traits |
|---|---|---|---|---|---|
| `1` | Egg | 60% | minimal | sleepy / shy | eggshell fragments, semi-transparent |
| `2` | Baby | 75% | simple | curious | fully hatched, early detail emergence |
| `3` | Teen | 100% | medium | confident smile | full elemental features visible |
| `4` | Adult | 115% | detailed | cool / stylish | accessory layer, aura, refined silhouette |
| `5` | Ultimate | 130% | elaborate | regal / powerful but cute | upgraded crown/wings/halo/full glow |

---

## Naming Contract

All output filenames must follow this exact convention:

```text
spirit_{type}_{pos}_{stage}.png
```

Examples:

```text
spirit_flame_noun_3.png
spirit_moon_adj_5.png
spirit_crystal_func_1.png
```

### Invalid filenames

The following are not allowed:

- missing `spirit_` prefix
- camelCase
- spaces
- translated filenames
- zero-padded stage numbers
- alternate abbreviations like `nm`, `vb`, `ultimate5`

---

## Codex Operating Rules

When acting as Codex for this project:

### 1. Prefer prompt engineering over vague art direction

If asked to generate assets, produce:

- a reusable base prompt
- one prompt per image or per batch item
- structured metadata for each asset
- optional manifest / CSV / JSON / TS mapping when useful

### 2. Preserve consistency across adjacent outputs

When generating multiple prompts in one batch, keep these stable unless explicitly changed:

- composition
- rendering language
- prompt skeleton
- quality constraints
- negative constraints
- naming structure

### 3. Work in batches, not ad hoc fragments

Default batching strategy:

- first generate **Stage 3** for one element across all 4 POS categories
- once approved, expand same element to stages 1–5
- then repeat for next element

If asked for faster launch scope, prioritize:

- all elements
- all POS categories
- only stages 1–2

### 4. Always output machine-usable artifacts when possible

Prefer structured output such as:

- Markdown tables
- JSON arrays
- CSV rows
- TypeScript mapping objects
- shell scripts for batch calls

### 5. Do not silently invent repository structure

If file paths are needed, use only these unless explicitly changed:

- image assets: `src/assets/spirits/`
- utility mapping: `src/utils/spiritImage.ts`
- generated manifests: `prompts/`, `scripts/`, or `assets-manifest/`

---

## Prompt Construction Standard

Every generation prompt should be composed from the following layers.

### Base Style Block

```text
Generate a single cute creature character for a mobile game.

Style requirements:
- Chibi / Q-version cartoon style
- Cute collectible-creature aesthetic
- Simple clean lines with cel-shading
- Transparent PNG background
- 512x512 pixels
- Front-facing, centered composition
- Cute, friendly, magical, not scary
- Suitable for teenage girl audience
- No text, no UI elements, no background scene
- Consistent visual style with the existing spirit sprite set
```

### Variant Block

Fill in these variables:

- `Element`
- `Design elements`
- `Body type`
- `Evolution stage`
- `Size feel`
- `Complexity`
- `Expression`
- `Special effects`

### Negative Constraint Block

Append this when generating prompts for image models:

```text
Avoid horror styling, realistic anatomy, violent posture, oversized weapons, dark gritty rendering, background scenery, side profile, clutter, text, logos, or UI overlays.
```

---

## Canonical Single-Image Prompt Template

```text
Generate a single cute creature character for a mobile game.

Style requirements:
- Chibi / Q-version cartoon style
- Cute collectible-creature aesthetic
- Simple clean lines with cel-shading
- Transparent PNG background
- 512x512 pixels
- Front-facing, centered composition
- Cute, friendly, magical, not scary
- Suitable for teenage girl audience
- No text, no UI elements, no background scene
- Consistent visual style with the existing spirit sprite set

Element: [ELEMENT_NAME] ([COLOR_DESCRIPTION])
Design elements: [DESIGN_ELEMENTS]

Body type: [POS_CATEGORY] ([POS_DESCRIPTION])

Evolution stage: [STAGE_NUMBER] - [STAGE_NAME]
Size feel: [SIZE_DESCRIPTION]
Complexity: [COMPLEXITY_DESCRIPTION]
Expression: [EXPRESSION]
Special effects: [EFFECTS]

Avoid horror styling, realistic anatomy, violent posture, oversized weapons, dark gritty rendering, background scenery, side profile, clutter, text, logos, or UI overlays.
```

---

## Canonical Batch Output Format

When asked to produce prompts in bulk, return items in this structure:

```markdown
## Batch: {element}_{pos}

### spirit_{type}_{pos}_{stage}.png
[prompt]

### spirit_{type}_{pos}_{stage}.png
[prompt]
```

If machine-readability is more important, return JSON like this:

```json
[
  {
    "filename": "spirit_flame_noun_1.png",
    "type": "flame",
    "pos": "noun",
    "stage": 1,
    "prompt": "..."
  }
]
```

---

## Acceptance Criteria

An image is acceptable only if all checks pass.

### Visual acceptance

- transparent background
- front-facing centered character
- immediately readable silhouette at small icon size
- clear elemental identity
- clear POS/body-category identity
- correct stage complexity relative to evolution scale
- cute appeal preserved
- no frightening or uncanny details
- style matches neighboring sprites

### Naming acceptance

- filename exactly matches naming contract
- no duplicates
- stage number matches intended prompt
- element and POS tags match visual content

### Set-level acceptance

Within a 5-stage line for the same `{type}_{pos}`:

- stage progression must be visible
- stage 1 and stage 5 must feel related
- colors should evolve, not reset randomly
- accessories should scale progressively
- silhouette family resemblance should remain strong

---

## Failure Modes to Prevent

Codex should proactively guard against these common failures:

### Style drift

Symptoms:

- later prompts become more complex or more realistic than early ones
- one element looks painterly while others look cel-shaded

Mitigation:

- reuse the same base style block verbatim
- vary only the structured attribute section

### Stage drift

Symptoms:

- stage 2 looks stronger than stage 3
- stage 5 is not visually more refined than stage 4

Mitigation:

- always encode size + complexity + expression + aura escalation
- compare against the canonical stage table before output

### POS drift

Symptoms:

- noun and verb silhouettes look interchangeable
- func body becomes animal-like

Mitigation:

- explicitly restate body-rule keywords in every prompt
- use category-specific silhouette language

### Overdesign

Symptoms:

- too many accessories
- clutter at 512px
- poor readability in app icon usage

Mitigation:

- prefer 2–4 strong visual cues over many minor details
- preserve silhouette clarity first

---

## Recommended Batch Order

Unless the user specifies otherwise, use this rollout plan.

### Phase A — Style lock

Generate only these 4 first:

- `spirit_flame_noun_3.png`
- `spirit_flame_verb_3.png`
- `spirit_flame_adj_3.png`
- `spirit_flame_func_3.png`

Goal:

- validate overall flame style
- validate POS silhouette separation
- establish style anchor for later batches

### Phase B — One full element

Generate all 20 for one element:

- one element
- all 4 POS categories
- all 5 stages

Goal:

- verify stage progression and internal consistency

### Phase C — Full production

Generate remaining elements using locked prompt skeleton.

---

## Required Output Helpers

When requested, Codex should be able to generate any of the following:

1. `AGENTS.md`
2. `prompts/*.md` batch prompt files
3. `spirits-manifest.json`
4. `spirits.csv`
5. `src/utils/spiritImage.ts` mapping scaffold
6. shell / node / python scripts for batch prompt export
7. QA checklist documents for manual review

---

## TypeScript Usage Contract

If generating app integration code, align to this mapping logic:

```ts
type PosCategory = 'noun' | 'verb' | 'adj' | 'func';

function getPosCategory(pos: string): PosCategory {
  switch (pos) {
    case 'n': return 'noun';
    case 'v': return 'verb';
    case 'adj':
    case 'adv':
      return 'adj';
    default:
      return 'func'; // prep, conj, pron
  }
}

function getSpiritImage(type: string, pos: string, stage: number) {
  const posCat = getPosCategory(pos);
  return `spirit_${type}_${posCat}_${stage}`;
}
```

When building static imports for Expo, assume dynamic `require()` is not supported. Prefer explicit mapping objects.

---

## Example: Flame Noun Stage 3

Use this as a reference-quality prompt pattern.

```text
Generate a single cute creature character for a mobile game.

Style requirements:
- Chibi / Q-version cartoon style
- Cute collectible-creature aesthetic
- Simple clean lines with cel-shading
- Transparent PNG background
- 512x512 pixels
- Front-facing, centered composition
- Cute, friendly, magical, not scary
- Suitable for teenage girl audience
- No text, no UI elements, no background scene
- Consistent visual style with the existing spirit sprite set

Element: Flame (red #ef4444 with orange-yellow #fbbf24 accents)
Design elements: small flame on top of head, fire wisps on tail, fire patterns on body

Body type: Noun-class — round, chubby, small animal-like body with stubby limbs, big eyes, cute and squishy

Evolution stage: 3 - Teen
Size feel: Normal (100%), well-proportioned
Complexity: Medium — all features fully formed, ears/tail/markings complete
Expression: Confident smile
Special effects: Saturated colors, active flame effects visible

Avoid horror styling, realistic anatomy, violent posture, oversized weapons, dark gritty rendering, background scenery, side profile, clutter, text, logos, or UI overlays.
```

---

## Behavior Rules for Codex Responses

When a user asks for generation help in this repository, follow these defaults:

- Start with the deliverable, not theory
- Be explicit about filenames and counts
- Prefer complete batches over partial examples
- Use tables for coverage tracking
- Call out assumptions when a prompt variable is inferred
- Include validation or QA criteria when generating at scale

If the request is ambiguous, choose the interpretation that best preserves:

1. style consistency
2. batch operability
3. deterministic naming
4. app integration readiness

---

## Done Definition

A batch is only “done” when all of the following exist:

- prompt set or image set for requested scope
- exact filenames
- coverage list showing what was generated
- no missing matrix cells in requested subset
- acceptance checklist or validation notes

If only prompts were produced, state that clearly.
If images were not actually rendered, do not imply they already exist.

---

## Source of Truth

The project prompt specification attached by the user is the source of truth for:

- image count
- naming convention
- elemental color systems
- POS/body rules
- evolution-stage rules
- style constraints

When there is a conflict, follow the user-provided sprite specification over generic assumptions.

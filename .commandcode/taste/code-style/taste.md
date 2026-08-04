# code-style
- Shared components in this project are "fixed" — overrides via className or inline styles on the consuming page don't work. Modifications must be made directly in the shared component file. Confidence: 0.80
- When removing UI elements from a page, be non-destructive: just remove the element and let remaining content settle naturally, without restructuring or redesigning the layout. Confidence: 0.70
- When removing content that affects layout positioning, maintain original vertical spacing with a spacer div to preserve the position of elements below. Confidence: 0.70
- When editing content sections, always preserve existing section headings without removing or replacing them. Confidence: 0.80
- When editing content, maintain the existing markup structure and coding patterns rather than restructuring them — e.g., keep the existing "unfold"/collapsible interaction as-is and only adjust what the new request requires ("don't lose the unfold setup we currently have"). Confidence: 0.8
- Never make edits or modify files when the user has only asked to learn or analyze patterns — wait for explicit edit instructions before making any changes. Confidence: 0.75
- When a change isn't taking effect or the fix keeps going in circles (e.g., CSS specificity, wrong rendering path), revert to the last known-good state rather than stacking more speculative edits. Confidence: 0.65
- When adding new copy/UI text to a page, reuse the project's existing typography components (e.g., `GammaParagraph`) rather than raw elements with ad-hoc classes — that's how new text matches the existing body font exactly. Confidence: 0.70

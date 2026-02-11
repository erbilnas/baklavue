# Theme Components

Demo and layout components for the documentation site.

## Structure

```
components/
├── theme/           # Layout components (banner, version badge, theme customizer)
├── alert/            # Alert demos
├── accordion/        # Accordion & FAQ demos
├── banner/           # Banner demos
├── button/           # Button demos
├── checkbox/         # Checkbox demos
├── chip/             # Chip demos
├── datepicker/       # Datepicker demos
├── dialog/           # Dialog demos
├── drawer/           # Drawer demos
├── dropdown/         # Dropdown demos
├── file-upload/      # File upload demos
├── form/             # Form demos
├── guide/            # Guide demos (e.g. localization)
├── icon/             # Icon demos
├── image/            # Image demos
├── input/            # Input, textarea, validation demos
├── link/             # Link demos
├── notification/     # Notification demos
├── pagination/       # Pagination demos
├── radio/            # Radio demos
├── scroll-to-top/    # Scroll to top demos
├── select/           # Select demos
├── skeleton/         # Skeleton demos
├── spinner/          # Spinner demos
├── split-button/     # Split button demos
├── stepper/          # Stepper demos
├── switch/           # Switch demos
├── tab/              # Tab demos
├── table/            # Table demos
├── tag/              # Tag demos
├── textarea/         # Textarea demos
├── tooltip/          # Tooltip demos
└── tokens/           # Design token demos
```

## Adding new demos

1. Create a new `*Demo.vue` file in the appropriate component folder
2. It will be **auto-registered** — no need to update `index.ts`
3. Use it in docs with `<YourDemoName />`

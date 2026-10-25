import {
  Button,
  ButtonGroup,
  TextButton,
  TextLink,
} from '@/components/ui';

export default function ButtonShowcase() {
  return (
    <div className="p-xlarge space-y-xlarge">
      <section>
        <h2 className="text-xlarge font-semibold mb-large">Button Variants</h2>
        <ButtonGroup className="gap-small flex-wrap">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </ButtonGroup>
      </section>

      <section>
        <h2 className="text-xlarge font-semibold mb-large">Button Sizes</h2>
        <ButtonGroup className="gap-small flex-wrap items-center">
          <Button size="small">Small</Button>
          <Button size="medium">Medium</Button>
          <Button size="large">Large</Button>
        </ButtonGroup>
      </section>

      <section>
        <h2 className="text-xlarge font-semibold mb-large">Surface Modifiers - Primary</h2>
        <div className="space-y-small">
          <div className="p-medium bg-accent-primary/10 rounded-large">
            <h3 className="text-small font-medium mb-small">On Accent Primary Background</h3>
            <ButtonGroup className="gap-small flex-wrap">
              <Button variant="primary" surface="on-accent-primary">Primary</Button>
              <Button variant="secondary" surface="on-accent-primary">Secondary</Button>
            </ButtonGroup>
          </div>
          <div className="p-medium bg-accent-secondary/10 rounded-large">
            <h3 className="text-small font-medium mb-small">On Accent Secondary Background</h3>
            <ButtonGroup className="gap-small flex-wrap">
              <Button variant="primary" surface="on-accent-secondary">Primary</Button>
              <Button variant="secondary" surface="on-accent-secondary">Secondary</Button>
            </ButtonGroup>
          </div>
          <div className="p-medium bg-accent-tertiary/10 rounded-large">
            <h3 className="text-small font-medium mb-small">On Accent Tertiary Background</h3>
            <ButtonGroup className="gap-small flex-wrap">
              <Button variant="primary" surface="on-accent-tertiary">Primary</Button>
              <Button variant="secondary" surface="on-accent-tertiary">Secondary</Button>
            </ButtonGroup>
          </div>
          <div className="p-medium bg-inverse rounded-large">
            <h3 className="text-small font-medium mb-small text-inverse-foreground">On Inverse Background</h3>
            <ButtonGroup className="gap-small flex-wrap">
              <Button variant="primary" surface="on-inverse">Primary</Button>
              <Button variant="secondary" surface="on-inverse">Secondary</Button>
            </ButtonGroup>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xlarge font-semibold mb-large">Button Groups</h2>
        <div className="space-y-medium">
          <div>
            <h3 className="text-small font-medium mb-small">Left Align (Default)</h3>
            <ButtonGroup>
              <Button variant="primary">Action 1</Button>
              <Button variant="secondary">Action 2</Button>
              <Button variant="outline">Action 3</Button>
            </ButtonGroup>
          </div>
          <div>
            <h3 className="text-small font-medium mb-small">Center Align</h3>
            <ButtonGroup align="center">
              <Button variant="primary">Action 1</Button>
              <Button variant="secondary">Action 2</Button>
              <Button variant="outline">Action 3</Button>
            </ButtonGroup>
          </div>
          <div>
            <h3 className="text-small font-medium mb-small">Right Align</h3>
            <ButtonGroup align="right">
              <Button variant="primary">Action 1</Button>
              <Button variant="secondary">Action 2</Button>
              <Button variant="outline">Action 3</Button>
            </ButtonGroup>
          </div>
          <div>
            <h3 className="text-small font-medium mb-small">Vertical Stretch</h3>
            <ButtonGroup direction="vertical" align="stretch">
              <Button variant="primary">Action 1</Button>
              <Button variant="secondary">Action 2</Button>
              <Button variant="outline">Action 3</Button>
            </ButtonGroup>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xlarge font-semibold mb-large">Text Buttons</h2>
        <div className="space-y-medium">
          <div>
            <h3 className="text-small font-medium mb-small">Variants</h3>
            <ButtonGroup className="gap-small flex-wrap">
              <TextButton variant="primary">Primary Text Button</TextButton>
              <TextButton variant="secondary">Secondary Text Button</TextButton>
            </ButtonGroup>
          </div>
          <div>
            <h3 className="text-small font-medium mb-small">Surface Modifiers</h3>
            <div className="p-medium bg-accent-primary/10 rounded-large">
              <ButtonGroup className="gap-small flex-wrap">
                <TextButton surface="on-accent-primary">On Accent Primary</TextButton>
                <TextButton surface="on-accent-secondary">On Accent Secondary</TextButton>
                <TextButton surface="on-accent-tertiary">On Accent Tertiary</TextButton>
                <TextButton surface="on-inverse">On Inverse</TextButton>
              </ButtonGroup>
            </div>
          </div>
          <div>
            <h3 className="text-small font-medium mb-small">Sizes</h3>
            <ButtonGroup className="gap-small flex-wrap items-center">
              <TextButton size="small">Small</TextButton>
              <TextButton size="medium">Medium</TextButton>
            </ButtonGroup>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xlarge font-semibold mb-large">Text Links</h2>
        <div className="space-y-medium">
          <div>
            <h3 className="text-small font-medium mb-small">Variants</h3>
            <ButtonGroup className="gap-small flex-wrap">
              <TextLink variant="primary" href="#">Primary Text Link</TextLink>
              <TextLink variant="secondary" href="#">Secondary Text Link</TextLink>
            </ButtonGroup>
          </div>
          <div>
            <h3 className="text-small font-medium mb-small">Surface Modifiers</h3>
            <div className="p-medium bg-accent-primary/10 rounded-large">
              <ButtonGroup className="gap-small flex-wrap">
                <TextLink surface="on-accent-primary" href="#">On Accent Primary</TextLink>
                <TextLink surface="on-accent-secondary" href="#">On Accent Secondary</TextLink>
                <TextLink surface="on-accent-tertiary" href="#">On Accent Tertiary</TextLink>
                <TextLink surface="on-inverse" href="#">On Inverse</TextLink>
              </ButtonGroup>
            </div>
          </div>
          <div>
            <h3 className="text-small font-medium mb-small">Sizes</h3>
            <ButtonGroup className="gap-small flex-wrap items-center">
              <TextLink size="small" href="#">Small</TextLink>
              <TextLink size="medium" href="#">Medium</TextLink>
            </ButtonGroup>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xlarge font-semibold mb-large">States</h2>
        <div className="space-y-medium">
          <div>
            <h3 className="text-small font-medium mb-small">Loading State</h3>
            <ButtonGroup className="gap-small flex-wrap">
              <Button loading>Loading Primary</Button>
              <Button variant="secondary" loading>Loading Secondary</Button>
            </ButtonGroup>
          </div>
          <div>
            <h3 className="text-small font-medium mb-small">Disabled State</h3>
            <ButtonGroup className="gap-small flex-wrap">
              <Button disabled>Disabled Primary</Button>
              <Button variant="secondary" disabled>Disabled Secondary</Button>
              <TextButton disabled>Disabled Text Button</TextButton>
              <TextLink href="#" className="pointer-events-none opacity-50" aria-disabled="true">Disabled Text Link</TextLink>
            </ButtonGroup>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xlarge font-semibold mb-large">With Icons</h2>
        <ButtonGroup className="gap-small flex-wrap">
          <Button>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Item
          </Button>
          <Button variant="secondary">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Download
          </Button>
          <Button variant="outline">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Button>
          <Button variant="ghost" size="small">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </Button>
        </ButtonGroup>
      </section>
    </div>
  );
}
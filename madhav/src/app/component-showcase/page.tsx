'use client';

import * as React from 'react';
import {
  Button,
  ButtonGroup,
  TextButton,
  TextLink,
  Divider,
  Dropdown,
  Accordion,
  Slider,
  Tabs,
  Card,
  InputField,
  InputLabel,
  InputWrapper,
  TextArea,
  Select,
  Checkbox,
  CheckboxLabel,
  CheckboxWrapper,
  Radio,
  RadioLabel,
  RadioWrapper,
  FormMessage,
  FormSuccessMessage,
  FormErrorMessage,
  Image,
  ImageCover,
  Icon,
  IconContainer,
  Avatar,
  AvatarGroup,
} from '@/components/ui';

export default function ComponentShowcase() {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [sliderValue, setSliderValue] = React.useState([30]);
  const [tabsValue, setTabsValue] = React.useState('tab1');
  const [accordionValue, setAccordionValue] = React.useState<string | string[]>('item1');
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState('option1');

  return (
    <div className="p-xlarge space-y-xxxlarge max-w-5xl mx-auto">
      <header>
        <h1 className="text-display font-bold mb-medium">Flowkit Component Showcase</h1>
        <p className="text-large text-muted-foreground">
          All components built with Flowkit patterns using class-variance-authority
        </p>
      </header>

      <section>
        <h2 className="text-xxlarge font-semibold mb-large">Buttons</h2>
        <div className="space-y-large">
          <div>
            <h3 className="text-large font-medium mb-medium">Variants</h3>
            <ButtonGroup className="gap-small flex-wrap">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </ButtonGroup>
          </div>
          <div>
            <h3 className="text-large font-medium mb-medium">Sizes</h3>
            <ButtonGroup className="gap-small flex-wrap items-center">
              <Button size="small">Small</Button>
              <Button size="medium">Medium</Button>
              <Button size="large">Large</Button>
            </ButtonGroup>
          </div>
          <div>
            <h3 className="text-large font-medium mb-medium">Surface Modifiers</h3>
            <div className="space-y-medium">
              <div className="p-medium bg-accent-primary/10 rounded-large">
                <h4 className="text-small font-medium mb-small">On Accent Primary</h4>
                <ButtonGroup className="gap-small flex-wrap">
                  <Button variant="primary" surface="on-accent-primary">Primary</Button>
                  <Button variant="secondary" surface="on-accent-primary">Secondary</Button>
                </ButtonGroup>
              </div>
              <div className="p-medium bg-accent-secondary/10 rounded-large">
                <h4 className="text-small font-medium mb-small">On Accent Secondary</h4>
                <ButtonGroup className="gap-small flex-wrap">
                  <Button variant="primary" surface="on-accent-secondary">Primary</Button>
                  <Button variant="secondary" surface="on-accent-secondary">Secondary</Button>
                </ButtonGroup>
              </div>
              <div className="p-medium bg-inverse rounded-large">
                <h4 className="text-small font-medium mb-small text-inverse-foreground">On Inverse</h4>
                <ButtonGroup className="gap-small flex-wrap">
                  <Button variant="primary" surface="on-inverse">Primary</Button>
                  <Button variant="secondary" surface="on-inverse">Secondary</Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-large font-medium mb-medium">Button Groups</h3>
            <ButtonGroup align="center">
              <Button variant="primary">Left</Button>
              <Button variant="secondary">Center</Button>
              <Button variant="outline">Right</Button>
            </ButtonGroup>
          </div>
        </div>
      </section>

      <Divider variant="accent" />

      <section>
        <h2 className="text-xxlarge font-semibold mb-large">Text Buttons & Links</h2>
        <div className="space-y-large">
          <div>
            <h3 className="text-large font-medium mb-medium">Text Buttons</h3>
            <ButtonGroup className="gap-small flex-wrap">
              <TextButton variant="primary">Primary Text Button</TextButton>
              <TextButton variant="secondary">Secondary Text Button</TextButton>
              <TextButton surface="on-accent-primary">On Accent Primary</TextButton>
              <TextButton surface="on-inverse">On Inverse</TextButton>
            </ButtonGroup>
          </div>
          <div>
            <h3 className="text-large font-medium mb-medium">Text Links</h3>
            <ButtonGroup className="gap-small flex-wrap">
              <TextLink variant="primary" href="#">Primary Text Link</TextLink>
              <TextLink variant="secondary" href="#">Secondary Text Link</TextLink>
              <TextLink surface="on-accent-primary" href="#">On Accent Primary</TextLink>
              <TextLink surface="on-inverse" href="#">On Inverse</TextLink>
            </ButtonGroup>
          </div>
        </div>
      </section>

      <Divider variant="accent" />

      <section>
        <h2 className="text-xxlarge font-semibold mb-large">Dividers</h2>
        <div className="space-y-large">
          <div>
            <h3 className="text-large font-medium mb-medium">Horizontal</h3>
            <div className="space-y-medium">
              <Divider />
              <Divider variant="secondary" />
              <Divider variant="accent" thickness="medium" />
              <Divider variant="accent" thickness="thick" />
            </div>
          </div>
          <div>
            <h3 className="text-large font-medium mb-medium">Vertical</h3>
            <div className="flex items-center gap-medium">
              <span>Before</span>
              <Divider orientation="vertical" variant="accent" className="h-8" />
              <span>After</span>
            </div>
          </div>
        </div>
      </section>

      <Divider variant="accent" />

      <section>
        <h2 className="text-xxlarge font-semibold mb-large">Dropdown</h2>
        <Dropdown.Root>
          <Dropdown.Trigger variant="outline">
            Open Dropdown
          </Dropdown.Trigger>
          <Dropdown.Content align="left" side="bottom">
            <Dropdown.Item onSelect={() => console.log('Profile')}>Profile</Dropdown.Item>
            <Dropdown.Item onSelect={() => console.log('Settings')}>Settings</Dropdown.Item>
            <Dropdown.Item onSelect={() => console.log('Billing')}>Billing</Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item variant="destructive" onSelect={() => console.log('Logout')}>Logout</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>
      </section>

      <Divider variant="accent" />

      <section>
        <h2 className="text-xxlarge font-semibold mb-large">Accordion</h2>
        <Accordion.Root type="single" value={accordionValue} onValueChange={setAccordionValue}>
          <Accordion.Item value="item1">
            <Accordion.Trigger>What is Flowkit?</Accordion.Trigger>
            <Accordion.Content>
              <p className="text-muted-foreground">
                Flowkit is a modular CSS Framework designed to power visually consistent and flexible Webflow websites.
              </p>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item2">
            <Accordion.Trigger>How do I use it?</Accordion.Trigger>
            <Accordion.Content>
              <p className="text-muted-foreground">
                Flowkit uses utility classes, component classes, and combo classes to create a consistent design system.
              </p>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item3">
            <Accordion.Trigger>Can I customize it?</Accordion.Trigger>
            <Accordion.Content>
              <p className="text-muted-foreground">
                Yes, Flowkit uses design tokens for colors, spacing, typography, and more that can be customized.
              </p>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </section>

      <Divider variant="accent" />

      <section>
        <h2 className="text-xxlarge font-semibold mb-large">Slider</h2>
        <div className="space-y-medium">
          <Slider.Root value={sliderValue} onValueChange={setSliderValue} max={100} step={1}>
            <Slider.Track>
              <Slider.Range />
              <Slider.Thumb index={0} />
            </Slider.Track>
          </Slider.Root>
          <p className="text-small text-muted-foreground">Value: {sliderValue[0]}</p>
        </div>
      </section>

      <Divider variant="accent" />

      <section>
        <h2 className="text-xxlarge font-semibold mb-large">Tabs</h2>
        <Tabs.Root value={tabsValue} onValueChange={setTabsValue} variant="line">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Account</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Profile</Tabs.Trigger>
            <Tabs.Trigger value="tab3">Settings</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">
            <p className="text-muted-foreground">Account settings content</p>
          </Tabs.Content>
          <Tabs.Content value="tab2">
            <p className="text-muted-foreground">Profile content</p>
          </Tabs.Content>
          <Tabs.Content value="tab3">
            <p className="text-muted-foreground">Settings content</p>
          </Tabs.Content>
        </Tabs.Root>
      </section>

      <Divider variant="accent" />

      <section>
        <h2 className="text-xxlarge font-semibold mb-large">Cards</h2>
        <div className="grid gap-medium grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Card.Root variant="default">
            <Card.Header>
              <Card.Title>Default Card</Card.Title>
              <Card.Description>This is a default card with header</Card.Description>
            </Card.Header>
            <Card.Content>
              <p className="text-muted-foreground">Card content goes here</p>
            </Card.Content>
            <Card.Footer>
              <Button variant="ghost" size="small">Action</Button>
            </Card.Footer>
          </Card.Root>
          <Card.Root variant="elevated" surface="primary" featured>
            <Card.Header>
              <Card.Title>Featured Card</Card.Title>
              <Card.Description>Elevated with primary surface</Card.Description>
            </Card.Header>
            <Card.Content>
              <p className="text-muted-foreground">Featured content</p>
            </Card.Content>
          </Card.Root>
          <Card.Link href="#" surface="accent-primary">
            <Card.Header>
              <Card.Title>Card Link</Card.Title>
              <Card.Description>Interactive card as link</Card.Description>
            </Card.Header>
            <Card.Content>
              <p className="text-muted-foreground">Clickable card content</p>
            </Card.Content>
          </Card.Link>
        </div>
      </section>

      <Divider variant="accent" />

      <section>
        <h2 className="text-xxlarge font-semibold mb-large">Forms</h2>
        <div className="space-y-large max-w-md">
          <InputWrapper>
            <InputLabel>Email Address</InputLabel>
            <InputField type="email" placeholder="you@example.com" />
            <FormMessage type="error">Please enter a valid email</FormMessage>
          </InputWrapper>

          <InputWrapper>
            <InputLabel>Password</InputLabel>
            <InputField type="password" placeholder="••••••••" variant="default" />
          </InputWrapper>

          <InputWrapper>
            <InputLabel>Bio</InputLabel>
            <TextArea placeholder="Tell us about yourself" rows={4} />
          </InputWrapper>

          <InputWrapper>
            <InputLabel>Plan</InputLabel>
            <Select>
              <option value="free">Free</option>
              <option value="pro">Pro</option>
              <option value="enterprise">Enterprise</option>
            </Select>
          </InputWrapper>

          <div className="space-y-medium">
            <h3 className="text-medium font-medium">Checkboxes</h3>
            <CheckboxWrapper>
              <Checkbox
                type="checkbox"
                checked={checkboxValue}
                onChange={(e) => setCheckboxValue(e.target.checked)}
                id="terms"
              />
              <CheckboxLabel htmlFor="terms">I agree to the terms and conditions</CheckboxLabel>
            </CheckboxWrapper>
            <CheckboxWrapper>
              <Checkbox
                type="checkbox"
                surface="on-accent-primary"
                id="newsletter"
              />
              <CheckboxLabel htmlFor="newsletter" surface="on-accent-primary">Subscribe to newsletter</CheckboxLabel>
            </CheckboxWrapper>
          </div>

          <div className="space-y-medium">
            <h3 className="text-medium font-medium">Radio Buttons</h3>
            <RadioWrapper>
              <Radio
                type="radio"
                value="option1"
                checked={radioValue === 'option1'}
                onChange={(e) => setRadioValue(e.target.value)}
                id="option1"
              />
              <RadioLabel htmlFor="option1">Option 1</RadioLabel>
            </RadioWrapper>
            <RadioWrapper>
              <Radio
                type="radio"
                value="option2"
                checked={radioValue === 'option2'}
                onChange={(e) => setRadioValue(e.target.value)}
                id="option2"
              />
              <RadioLabel htmlFor="option2">Option 2</RadioLabel>
            </RadioWrapper>
            <RadioWrapper>
              <Radio
                type="radio"
                value="option3"
                checked={radioValue === 'option3'}
                onChange={(e) => setRadioValue(e.target.value)}
                id="option3"
              />
              <RadioLabel htmlFor="option3">Option 3</RadioLabel>
            </RadioWrapper>
          </div>

          <div className="space-y-medium">
            <FormSuccessMessage>Form submitted successfully!</FormSuccessMessage>
            <FormErrorMessage>There was an error submitting the form.</FormErrorMessage>
          </div>

          <ButtonGroup>
            <Button type="submit">Submit</Button>
            <Button variant="secondary">Cancel</Button>
          </ButtonGroup>
        </div>
      </section>

      <Divider variant="accent" />

      <section>
        <h2 className="text-xxlarge font-semibold mb-large">Images & Aspect Ratios</h2>
        <div className="space-y-large">
          <div>
            <h3 className="text-large font-medium mb-medium">Image Cover with Ratios</h3>
            <div className="grid gap-medium grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <ImageCover src="https://picsum.photos/400/400" alt="Square" ratio="1x1" />
              <ImageCover src="https://picsum.photos/640/360" alt="16:9" ratio="16x9" />
              <ImageCover src="https://picsum.photos/600/400" alt="3:2" ratio="3x2" />
              <ImageCover src="https://picsum.photos/400/300" alt="4:3" ratio="4x3" />
              <ImageCover src="https://picsum.photos/400/500" alt="2:2.5" ratio="2x2.5" />
              <ImageCover src="https://picsum.photos/400/600" alt="2:3" ratio="2x3" />
            </div>
          </div>
          <div>
            <h3 className="text-large font-medium mb-medium">Regular Images</h3>
            <div className="flex gap-medium flex-wrap">
              <Image src="https://picsum.photos/200/200" alt="Small" width={200} height={200} fit="cover" />
              <Image src="https://picsum.photos/200/200" alt="Contain" width={200} height={200} fit="contain" />
              <Image src="https://picsum.photos/200/200" alt="Rounded" width={200} height={200} radius="full" />
            </div>
          </div>
        </div>
      </section>

      <Divider variant="accent" />

      <section>
        <h2 className="text-xxlarge font-semibold mb-large">Icons</h2>
        <div className="space-y-large">
          <div>
            <h3 className="text-large font-medium mb-medium">Sizes</h3>
            <div className="flex items-center gap-medium flex-wrap">
              <Icon size="xsmall" aria-label="XSmall">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              </Icon>
              <Icon size="small" aria-label="Small">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              </Icon>
              <Icon size="medium" aria-label="Medium">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              </Icon>
              <Icon size="large" aria-label="Large">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              </Icon>
              <Icon size="xlarge" aria-label="XLarge">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              </Icon>
            </div>
          </div>
          <div>
            <h3 className="text-large font-medium mb-medium">Surface Modifiers</h3>
            <div className="p-medium bg-accent-primary/10 rounded-large">
              <div className="flex items-center gap-medium flex-wrap">
                <Icon surface="on-accent-primary" aria-label="On Accent Primary">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                </Icon>
                <Icon surface="on-accent-secondary" aria-label="On Accent Secondary">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                </Icon>
                <Icon surface="on-accent-tertiary" aria-label="On Accent Tertiary">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                </Icon>
                <Icon surface="on-inverse" aria-label="On Inverse">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                </Icon>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-large font-medium mb-medium">Icon Containers (with background)</h3>
            <div className="flex items-center gap-medium flex-wrap">
              <IconContainer background aria-label="With background">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              </IconContainer>
              <IconContainer surface="on-accent-primary" background aria-label="On Accent Primary with background">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              </IconContainer>
            </div>
          </div>
        </div>
      </section>

      <Divider variant="accent" />

      <section>
        <h2 className="text-xxlarge font-semibold mb-large">Avatars</h2>
        <div className="space-y-large">
          <div>
            <h3 className="text-large font-medium mb-medium">Sizes</h3>
            <div className="flex items-center gap-medium flex-wrap">
              <Avatar size="small" fallback="JD" />
              <Avatar size="medium" fallback="JD" />
              <Avatar size="large" fallback="JD" />
              <Avatar size="xlarge" fallback="JD" />
              <Avatar size="xxlarge" fallback="JD" />
            </div>
          </div>
          <div>
            <h3 className="text-large font-medium mb-medium">With Images</h3>
            <div className="flex items-center gap-medium flex-wrap">
              <Avatar size="medium" src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" alt="User 1" />
              <Avatar size="medium" src="https://api.dicebear.com/7.x/avataaars/svg?seed=2" alt="User 2" />
              <Avatar size="medium" src="https://api.dicebear.com/7.x/avataaars/svg?seed=3" alt="User 3" />
            </div>
          </div>
          <div>
            <h3 className="text-large font-medium mb-medium">Avatar Group</h3>
            <AvatarGroup max={3}>
              <Avatar size="medium" src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" alt="User 1" />
              <Avatar size="medium" src="https://api.dicebear.com/7.x/avataaars/svg?seed=2" alt="User 2" />
              <Avatar size="medium" src="https://api.dicebear.com/7.x/avataaars/svg?seed=3" alt="User 3" />
              <Avatar size="medium" src="https://api.dicebear.com/7.x/avataaars/svg?seed=4" alt="User 4" />
              <Avatar size="medium" src="https://api.dicebear.com/7.x/avataaars/svg?seed=5" alt="User 5" />
            </AvatarGroup>
          </div>
        </div>
      </section>
    </div>
  );
}
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../components/button';

const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'default',
    label: 'Log In'
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Log Out'
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    variant: 'default',
    label: 'Sign Up'
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    variant: 'default',
    label: 'Sign In'
  },
};

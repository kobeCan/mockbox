import { Button } from '@nextui-org/react';
import { createLazyFileRoute } from '@tanstack/react-router';
import Post from '../docs/Post.mdx';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <Button color="primary">ok</Button>
      <Button color="primary">ok</Button>
      <Post />
    </div>
  );
}

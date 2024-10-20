import { NextUIProvider } from '@nextui-org/react';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <NextUIProvider>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>

        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
      <hr />
      <div className="flex justify-center">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </NextUIProvider>
  ),
});

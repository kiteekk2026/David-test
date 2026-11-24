# Next.js font downloads happen at build time

The production build could not download Inter or Lusitana within the restricted
network environment. A repeat with network access downloaded both and completed
Turbopack compilation. Type checking then exposed stale generated route files,
a separate issue covered in the [route types note](stale-next-route-types.md).

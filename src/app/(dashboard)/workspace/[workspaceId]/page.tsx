interface WorkspaceIdPageProps {
  params: Promise<{ workspaceId: string }>;
}

export default async function WorkspaceIdPage({ params }: WorkspaceIdPageProps) {
  const { workspaceId } = await params;

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Welcome to Workspace</h1>
      <p className="text-gray-600">Workspace ID: {workspaceId}</p>
      {/* TODO: Add workspace content here */}
    </div>
  );
}

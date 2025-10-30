import { useState } from 'react';

function useUpdateRenderer() {
  const [updateRenderer, setUpdateRenderer] = useState<boolean>();

  return () => setUpdateRenderer(!updateRenderer);
}

export default useUpdateRenderer;
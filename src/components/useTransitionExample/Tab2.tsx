import { memo } from 'react'
import type { ReactElement } from 'react'

const Tab2 = memo(function Tab2() {
  const items: ReactElement[] = []
  for (let i = 0; i < 500; i++) {
    items.push(<Post key={i} index={i} />)
  }
  return <ul className='items'>{items}</ul>
})

function Post({ index }: { index: number }) {
  /* eslint-disable react-hooks/purity -- deliberate busy-wait so this tab is slow enough to show the pending state */
  const startTime = performance.now()
  while (performance.now() - startTime < 1) {
    // Artificial delay
  }
  /* eslint-enable react-hooks/purity */

  return <li className='item'>Post {index + 1}</li>
}

export default Tab2

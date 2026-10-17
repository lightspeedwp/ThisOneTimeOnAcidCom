# Travel Icons

Icons related to travel, location, tours, activities, and destinations for the Ash Shaw Makeup Portfolio (applicable for future travel/event-based features).

> **Note:** All icons now use `@phosphor-icons/react`. Lucide has been fully replaced.

## 📋 Available Icons

### Location & Navigation

#### MapPin
**Usage:** Location markers, venue addresses, event locations

```tsx
import { MapPin } from '@phosphor-icons/react';

<div className="flex items-center gap-2">
  <MapPin size={20} weight="regular" />
  <span>Cape Town, South Africa</span>
</div>
```

#### NavigationArrow
**Usage:** Directions, GPS navigation, route planning

```tsx
import { NavigationArrow } from '@phosphor-icons/react';

<a href="/directions" className="flex items-center gap-2">
  <NavigationArrow size={16} weight="regular" />
  <span>Get Directions</span>
</a>
```

#### Compass
**Usage:** Exploration features, discovery sections

```tsx
import { Compass } from '@phosphor-icons/react';

<Compass size={24} weight="regular" />
```

### Events & Calendar

#### Calendar
**Usage:** Event dates, festival schedule, timeline

```tsx
import { Calendar } from '@phosphor-icons/react';

<div className="flex items-center gap-2">
  <Calendar size={20} weight="regular" />
  <span>January 15, 2025</span>
</div>
```

#### Clock
**Usage:** Duration, reading time, event timing

```tsx
import { Clock } from '@phosphor-icons/react';

<span className="flex items-center gap-1">
  <Clock size={16} weight="regular" />
  2 hours
</span>
```

### People & Groups

#### Users
**Usage:** Group events, team members, attendees

```tsx
import { Users } from '@phosphor-icons/react';

<div className="flex items-center gap-2">
  <Users size={20} weight="regular" />
  <span>Group Festival Pass (5+ people)</span>
</div>
```

#### User
**Usage:** Profile, contact, collaborator

```tsx
import { User } from '@phosphor-icons/react';

<User size={20} weight="regular" />
```

#### UserPlus
**Usage:** Add guest, invite people, new contact

```tsx
import { UserPlus } from '@phosphor-icons/react';

<button className="flex items-center gap-2">
  <UserPlus size={20} weight="regular" />
  <span>Add Guest</span>
</button>
```

### Activity Types

#### Camera
**Usage:** Photography services, portfolio shoots

```tsx
import { Camera } from '@phosphor-icons/react';

<Camera size={24} weight="regular" />
```

#### Mountains
**Usage:** Outdoor events, festival venues

```tsx
import { Mountains } from '@phosphor-icons/react';

<Mountains size={16} weight="regular" />
```

#### Waves
**Usage:** Beach events, coastal venues

```tsx
import { Waves } from '@phosphor-icons/react';

<Waves size={20} weight="regular" />
```

#### PalmTree
**Usage:** Tropical events, summer festivals

```tsx
import { Tree } from '@phosphor-icons/react';

<Tree size={20} weight="regular" />
```

### Travel & Transport

#### Airplane
**Usage:** Travel packages, destination events

```tsx
import { Airplane } from '@phosphor-icons/react';

<div className="flex items-center gap-2">
  <Airplane size={20} weight="regular" />
  <span>Destination Event</span>
</div>
```

#### Car
**Usage:** Transportation, venue access

```tsx
import { Car } from '@phosphor-icons/react';

<Car size={16} weight="regular" />
```

#### Bus
**Usage:** Group transport, shuttle service

```tsx
import { Bus } from '@phosphor-icons/react';

<Bus size={16} weight="regular" />
```

---

## Related Documentation

- **[overview-icons.md](../overview-icons.md)** - Icon system overview
- **[iconography.md](../design-tokens/iconography.md)** - Phosphor design tokens
- **[interface.md](./interface.md)** - UI control icons
- **[Guidelines.md](../Guidelines.md)** - Main guidelines

---

**Last Updated:** March 2026  
**Version:** 4.0.0 (Phosphor migration complete)

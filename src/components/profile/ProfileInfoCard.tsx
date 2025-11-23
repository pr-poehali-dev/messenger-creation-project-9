import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import { toast } from 'sonner'

interface Customer {
  name: string
  email: string
  phone?: string
}

interface ProfileInfoCardProps {
  customer: Customer
  updateProfile: (data: Partial<Customer>) => void
}

export default function ProfileInfoCard({ customer, updateProfile }: ProfileInfoCardProps) {
  const [editMode, setEditMode] = useState(false)
  const [name, setName] = useState(customer?.name || '')
  const [phone, setPhone] = useState(customer?.phone || '')

  const handleSaveProfile = () => {
    updateProfile({ name, phone })
    setEditMode(false)
    toast.success('Профиль обновлён', {
      description: 'Ваши данные успешно сохранены',
      icon: '✅',
    })
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="User" className="h-5 w-5 text-purple-600" />
          Профиль
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {editMode ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-purple-200 focus:border-purple-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={customer?.email}
                disabled
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (999) 123-45-67"
                className="border-purple-200 focus:border-purple-500"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSaveProfile} className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Сохранить
              </Button>
              <Button onClick={() => setEditMode(false)} variant="outline">
                Отмена
              </Button>
            </div>
          </>
        ) : (
          <>
            <div>
              <p className="text-sm text-muted-foreground">Имя</p>
              <p className="font-medium">{customer?.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{customer?.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Телефон</p>
              <p className="font-medium">{customer?.phone || 'Не указан'}</p>
            </div>
            <Button 
              onClick={() => setEditMode(true)} 
              variant="outline" 
              className="w-full border-purple-200 hover:bg-purple-50"
            >
              <Icon name="Edit" className="h-4 w-4 mr-2" />
              Редактировать профиль
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}

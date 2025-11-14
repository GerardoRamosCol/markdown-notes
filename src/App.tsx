import { useState, useMemo, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Plus, MagnifyingGlass, Trash, X, NotePencil, Heart, GithubLogo } from '@phosphor-icons/react'
import { marked } from 'marked'
import { motion, AnimatePresence } from 'framer-motion'

interface Note {
  id: string
  title: string
  content: string
  createdAt: number
  updatedAt: number
}

function App() {
  const [notes, setNotes] = useKV<Note[]>('notes', [])
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null)

  const selectedNote = useMemo(
    () => notes?.find((note) => note.id === selectedNoteId) || null,
    [notes, selectedNoteId]
  )

  useEffect(() => {
    if (selectedNote) {
      setEditTitle(selectedNote.title)
      setEditContent(selectedNote.content)
    }
  }, [selectedNote])

  const filteredNotes = useMemo(() => {
    if (!notes) return []
    if (!searchQuery.trim()) return notes

    const query = searchQuery.toLowerCase()
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query)
    )
  }, [notes, searchQuery])

  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    setNotes((current) => [newNote, ...(current || [])])
    setSelectedNoteId(newNote.id)
  }

  const updateNote = (title: string, content: string) => {
    if (!selectedNoteId) return

    setNotes((current) =>
      (current || []).map((note) =>
        note.id === selectedNoteId
          ? { ...note, title, content, updatedAt: Date.now() }
          : note
      )
    )
  }

  const confirmDelete = (noteId: string) => {
    setNoteToDelete(noteId)
    setDeleteDialogOpen(true)
  }

  const deleteNote = () => {
    if (!noteToDelete) return

    setNotes((current) => (current || []).filter((note) => note.id !== noteToDelete))
    
    if (selectedNoteId === noteToDelete) {
      setSelectedNoteId(null)
      setEditTitle('')
      setEditContent('')
    }
    
    setDeleteDialogOpen(false)
    setNoteToDelete(null)
  }

  const handleTitleChange = (value: string) => {
    setEditTitle(value)
    updateNote(value, editContent)
  }

  const handleContentChange = (value: string) => {
    setEditContent(value)
    updateNote(editTitle, value)
  }

  const markdownHtml = useMemo(() => {
    if (!editContent) return ''
    return marked(editContent, { breaks: true })
  }, [editContent])

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (days === 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60))
      if (hours === 0) {
        const minutes = Math.floor(diff / (1000 * 60))
        return minutes === 0 ? 'Just now' : `${minutes}m ago`
      }
      return `${hours}h ago`
    } else if (days === 1) {
      return 'Yesterday'
    } else if (days < 7) {
      return `${days}d ago`
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }

  return (
    <div className="h-screen w-screen bg-background flex flex-col">
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="border-b border-border bg-card/50 backdrop-blur-sm"
      >
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-accent text-accent-foreground rounded-lg p-2">
              <NotePencil className="h-5 w-5" weight="duotone" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Notes</h1>
              <p className="text-xs text-muted-foreground">Capture your thoughts</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{notes?.length || 0} {notes?.length === 1 ? 'note' : 'notes'}</span>
          </div>
        </div>
      </motion.header>

      <div className="flex-1 flex min-h-0">
        <div className="w-80 border-r border-border flex flex-col">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-foreground">All Notes</h2>
            <Button
              size="sm"
              onClick={createNewNote}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="relative">
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search-input"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-9 text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <Separator />

        <ScrollArea className="flex-1">
          <div className="p-3 space-y-2">
            <AnimatePresence mode="popLayout">
              {filteredNotes.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12 px-4"
                >
                  <p className="text-sm text-muted-foreground">
                    {searchQuery ? 'No notes found' : 'No notes yet'}
                  </p>
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSearchQuery('')}
                      className="mt-2"
                    >
                      Clear search
                    </Button>
                  )}
                </motion.div>
              ) : (
                filteredNotes.map((note) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card
                      className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                        selectedNoteId === note.id
                          ? 'ring-2 ring-accent bg-secondary/50'
                          : 'hover:bg-secondary/30'
                      }`}
                      onClick={() => setSelectedNoteId(note.id)}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-medium text-sm text-foreground truncate flex-1">
                          {note.title || 'Untitled Note'}
                        </h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            confirmDelete(note.id)
                          }}
                          className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                        {note.content || 'No content'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(note.updatedAt)}
                      </p>
                    </Card>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </div>

      <div className="flex-1 flex">
        {selectedNote ? (
          <>
            <div className="flex-1 flex flex-col">
              <div className="p-6 border-b border-border">
                <Input
                  id="note-title"
                  value={editTitle}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Note title..."
                  className="text-lg font-medium border-0 px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <div className="flex-1 p-6">
                <Textarea
                  id="note-content"
                  value={editContent}
                  onChange={(e) => handleContentChange(e.target.value)}
                  placeholder="Start writing... (Markdown supported)"
                  className="h-full resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-[15px] leading-relaxed"
                />
              </div>
            </div>

            <Separator orientation="vertical" />

            <div className="flex-1 flex flex-col">
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-medium text-foreground">Preview</h2>
              </div>
              <ScrollArea className="flex-1">
                <div
                  className="p-6 prose prose-slate max-w-none text-[15px] leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: markdownHtml }}
                />
              </ScrollArea>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">Select a note to view or edit</p>
              {(!notes || notes.length === 0) && (
                <Button onClick={createNewNote} className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Create your first note
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
      </div>

      <motion.footer 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="border-t border-border bg-card/30 backdrop-blur-sm"
      >
        <div className="px-6 py-3 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>Made with <Heart className="inline h-3 w-3 text-red-400" weight="fill" /> by Spark</span>
            <Separator orientation="vertical" className="h-3" />
            <span>Markdown-powered notes</span>
          </div>
          <div className="flex items-center gap-3">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <GithubLogo className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </motion.footer>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete note?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This note will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteNote}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default App

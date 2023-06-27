export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      phrase_pairs: {
        Row: {
          createdAt: string
          id: string
          phraseOne: string
          phraseTwo: string
          relevance: number
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id: string
          phraseOne: string
          phraseTwo: string
          relevance: number
          updatedAt: string
        }
        Update: {
          createdAt?: string
          id?: string
          phraseOne?: string
          phraseTwo?: string
          relevance?: number
          updatedAt?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          email: string
          id: number
        }
        Insert: {
          email: string
          id?: number
        }
        Update: {
          email?: string
          id?: number
        }
        Relationships: []
      }
      vote: {
        Row: {
          createdAt: string
          id: string
          phrasePairId: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id: string
          phrasePairId: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          id?: string
          phrasePairId?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "vote_phrasePairId_fkey"
            columns: ["phrasePairId"]
            referencedRelation: "phrase_pairs"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

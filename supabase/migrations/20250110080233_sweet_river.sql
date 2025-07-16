/*
  # Initial schema for Take and Eat application

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key)
      - `email` (text)
      - `full_name` (text)
      - `created_at` (timestamp)
    
    - `food_listings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `country` (text)
      - `city` (text)
      - `address` (text)
      - `food_type` (text)
      - `available_date` (date)
      - `created_at` (timestamp)
      - `is_taken` (boolean)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text NOT NULL,
  full_name text,
  created_at timestamptz DEFAULT now()
);

-- Create food listings table
CREATE TABLE food_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  country text NOT NULL,
  city text NOT NULL,
  address text NOT NULL,
  food_type text NOT NULL,
  available_date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  is_taken boolean DEFAULT false
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_listings ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Food listings policies
CREATE POLICY "Anyone can view available food listings"
  ON food_listings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create food listings"
  ON food_listings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own food listings"
  ON food_listings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);
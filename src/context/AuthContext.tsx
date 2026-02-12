import { createContext, useState, useContext, ReactNode } from "react";
import type {User, Login, AuthRes, AuthContext } from '../interfaces/Auth';

// Create context
const AuthContext = createContext <AuthContext | null> (null);



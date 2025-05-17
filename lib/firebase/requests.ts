import { db } from "./firebase"
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore"

// Submit a new request
export async function submitRequest(data: any) {
  try {
    const requestData = {
      ...data,
      status: "pending",
      isPaid: false,
      createdAt: serverTimestamp(),
    }

    const docRef = await addDoc(collection(db, "requests"), requestData)
    return { id: docRef.id, ...requestData }
  } catch (error) {
    console.error("Error submitting request:", error)
    throw error
  }
}

// Get all requests
export async function getRequests() {
  try {
    const q = query(collection(db, "requests"), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error("Error getting requests:", error)
    throw error
  }
}

// Get a request by ID
export async function getRequestById(id: string) {
  try {
    const docRef = doc(db, "requests", id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      }
    } else {
      return null
    }
  } catch (error) {
    console.error("Error getting request:", error)
    throw error
  }
}

// Update a request's solution
export async function updateRequestSolution(id: string, solutionData: any) {
  try {
    const docRef = doc(db, "requests", id)
    await updateDoc(docRef, {
      ...solutionData,
      status: "in-progress",
      updatedAt: serverTimestamp(),
    })
    return true
  } catch (error) {
    console.error("Error updating request solution:", error)
    throw error
  }
}

// Update a request's payment status
export async function updateRequestPaymentStatus(id: string, isPaid: boolean) {
  try {
    const docRef = doc(db, "requests", id)
    await updateDoc(docRef, {
      isPaid,
      status: isPaid ? "completed" : "in-progress",
      paymentDate: isPaid ? serverTimestamp() : null,
      updatedAt: serverTimestamp(),
    })
    return true
  } catch (error) {
    console.error("Error updating payment status:", error)
    throw error
  }
}

// Mark a request as paid
export async function markRequestAsPaid(id: string) {
  return updateRequestPaymentStatus(id, true)
}

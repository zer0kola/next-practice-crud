"use server";

import { Database } from "types_db";
import { createServerSupabaseClient } from "utils/supabase/server";

export type TodoRow = Database["public"]["Tables"]["todo"]["Row"];
export type TodoRowInsert = Database["public"]["Tables"]["todo"]["Insert"];
export type TodoRowUpdate = Database["public"]["Tables"]["todo"]["Update"];

function handleError(error) {
  console.error(error);
  throw new Error(error.message);
}

// todo 리스트 가져오기
export async function getTodoList({ searchInput = "" }): Promise<TodoRow[]> {
  // 서버에서 supabase client 생성
  const supabase = await createServerSupabaseClient();

  // supabase client를 통해 todo 테이블에서 데이터를 가져온다.
  const { data, error } = await supabase
    // todo 테이블에서 데이터를 가져온다.
    .from("todo")
    // 모든 컬럼을 가져온다.
    .select("*")
    // 검색어가 포함된 데이터만 가져온다.
    // like 쿼리는 %로 감싼 문자열을 포함하는 데이터를 가져온다.
    .like("title", `%${searchInput}%`)
    // 생성일 기준으로 오름차순 정렬한다.
    .order("created_at", { ascending: true });

  if (error) {
    handleError(error);
  }

  return data;
}

// todo 생성
export async function createTodo(todo: TodoRowInsert) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    // todo 테이블
    .from("todo")
    // 데이터 삽입
    .insert({
      ...todo,
      created_at: new Date().toISOString(),
    });

  if (error) {
    handleError(error);
  }

  return data;
}

// todo 업데이트
export async function updateTodo(todo: TodoRowUpdate) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("todo")
    .update({
      ...todo,
      updated_at: new Date().toISOString(),
    })
    // id가 일치하는 데이터만 업데이트한다.
    .eq("id", todo.id);

  if (error) {
    handleError(error);
  }

  return data;
}

// todo 삭제
export async function deleteTodo(id: number) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("todo")
    // id가 일치하는 데이터만 삭제한다.
    .delete()
    .eq("id", id);

  if (error) {
    handleError(error);
  }

  return data;
}

import React, { useState } from "react";
import { RiLockPasswordFill, RiMailAiFill, RiUser2Fill } from "react-icons/ri";

type Props = {};

const page = (props: Props) => {

  return (
    <main className="flex justify-center py-4">
      <section className="w-[650px] p-4  text-black bg-zinc-900 rounded-2xl">
        <form className="bg-white rounded-2xl p-8">
          <fieldset className="space-y-8">
            <legend className="text-xl font-semibold text-center">
            Entre com sua conta
            </legend>

            <div className="flex flex-col py-4 px-20 gap-8  ">
              <label className="flex justify-center items-center gap-2">
                <span className="text-2xl">
                  <RiMailAiFill />
                </span>
                <input
                   name="Email"
                  type="text"
                  className="input flex-1"
                  placeholder="Email"
                />
              </label>

              <label className="flex justify-center items-center gap-2">
                <span className="text-2xl">
                  <RiLockPasswordFill />
                </span>
                <input
                  type="password"
                  className="input flex-1"
                  placeholder="Senha"
                />
              </label>

              <input
                type="submit"
                className="btn bg-black text-white mx-10 cursor-pointer"
                value="Entrar"
              />
            </div>
          </fieldset>
        </form>
      </section>
    </main>
  );
};

export default page;
